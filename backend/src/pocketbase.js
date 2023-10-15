import PocketBase from "pocketbase";
import "dotenv/config";
import { get_product_slug } from "./back_market.js";

export async function init_pocketbase() {
  const pb = new PocketBase("http://127.0.0.1:8090");

  await pb.admins.authWithPassword(
    process.env.POCKETBASE_ADMIN_EMAIL,
    process.env.POCKETBASE_ADMIN_PASSWORD
  );

  return pb;
}

export async function get_tracked_products() {
  const pb = await init_pocketbase();

  const tracked_products = (
    await pb.collection("tracked_products").getFullList()
  ).map((product_record) => {
    return { record_id: product_record.id, pb_uuid: product_record.pb_uuid };
  });

  return tracked_products;
}

export async function add_tracked_product(product_bm_uuid) {
  const pb = await init_pocketbase();

  const product_data = {
    pb_uuid: product_bm_uuid,
    slug: await get_product_slug(product_bm_uuid),
  };

  const tracked_product_record = await pb
    .collection("tracked_products")
    .create(product_data);

  return tracked_product_record.id;
}

export async function add_product_snapshot(
  product_record_id,
  product_condition,
  product_in_stock,
  product_price
) {
  const pb = await init_pocketbase();

  const product_snapshot_data = {
    product: product_record_id,
    condition: product_condition,
    in_stock: product_in_stock,
    price_gbp: product_price,
  };

  const product_snapshot_record = await pb
    .collection("product_snapshots")
    .create(product_snapshot_data);

  return product_snapshot_record.id;
}
