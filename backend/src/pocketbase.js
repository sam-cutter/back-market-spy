import PocketBase from "pocketbase";
import "dotenv/config";

export async function init_pocketbase() {
  try {
    const pb = new PocketBase("http://127.0.0.1:8090");

    await pb.admins.authWithPassword(
      process.env.POCKETBASE_ADMIN_EMAIL,
      process.env.POCKETBASE_ADMIN_PASSWORD
    );

    return {
      success: {
        value: true,
        reason: "",
      },
      pocketbase: pb,
    };
  } catch (error) {
    return {
      success: {
        value: false,
        reason: error.message,
      },
      pocketbase: undefined,
    };
  }
}

export async function get_tracked_products() {
  const pb = (await init_pocketbase()).pocketbase;

  const tracked_products = (
    await pb.collection("tracked_products").getFullList()
  ).map((product_record) => {
    return { record_id: product_record.id, bm_uuid: product_record.bm_uuid };
  });

  return tracked_products;
}

export async function add_tracked_product(product_bm_uuid) {
  const pb = (await init_pocketbase()).pocketbase;

  const product_data = {
    bm_uuid: product_bm_uuid,
  };

  const tracked_product_record = await pb
    .collection("tracked_products")
    .create(product_data);

  return tracked_product_record.id;
}

export async function add_product_snapshot(
  product_record_id,
  product_grade,
  product_available,
  product_price
) {
  const pb = (await init_pocketbase()).pocketbase;

  const product_snapshot_data = {
    product: product_record_id,
    grade: product_grade,
    available: product_available,
    price_gbp: product_price,
  };

  const product_snapshot_record = await pb
    .collection("product_snapshots")
    .create(product_snapshot_data);

  return product_snapshot_record.id;
}

export async function is_product_tracked(product_bm_uuid) {
  const pb = (await init_pocketbase()).pocketbase;

  return (
    (
      await pb.collection("tracked_products").getFullList({
        filter: `bm_uuid = "${product_bm_uuid}"`,
      })
    ).length > 0
  );
}
