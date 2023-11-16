import init_pocketbase from "./init_pocketbase.js";

export default async function add_product_snapshot(
  product_record_id,
  product_grade,
  product_available,
  product_price
) {
  try {
    const pb = await init_pocketbase();

    const product_snapshot_data = {
      product: product_record_id,
      grade: product_grade,
      available: product_available,
      price_gbp: product_price,
    };

    const product_snapshot_record = await pb
      .collection("product_snapshots")
      .create(product_snapshot_data);

    return {
      success: {
        value: true,
        reason: "",
      },
      data: {
        record_id: product_snapshot_record.id,
      },
    };
  } catch (error) {
    return {
      success: {
        value: false,
        reason: error.message,
      },
      data: {
        record_id: undefined,
      },
    };
  }
}
