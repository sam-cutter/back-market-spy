import init_pocketbase from "./init_pocketbase.js";

export default async function add_tracked_product(product_bm_uuid) {
  try {
    const pb = await init_pocketbase();

    const product_data = {
      bm_uuid: product_bm_uuid,
    };

    const tracked_product_record = await pb
      .collection("tracked_products")
      .create(product_data);

    return {
      success: {
        value: true,
        reason: "",
      },
      data: {
        record_id: tracked_product_record.id,
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
