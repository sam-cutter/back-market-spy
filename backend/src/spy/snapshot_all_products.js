import generate_product_snapshot from "./generate_product_snapshot.js";
import get_tracked_products from "../pocketbase/get_tracked_products.js";

export default async function snapshot_all_products() {
  try {
    const tracked_products_result = await get_tracked_products();

    if (!tracked_products_result.success.value) {
      return {
        success: {
          value: false,
          reason: tracked_products_result.success.reason,
        },
      };
    }

    const tracked_products = tracked_products_result.data.items;

    for (const product of tracked_products) {
      await generate_product_snapshot(product.bm_uuid, product.record_id);
    }
  } catch (error) {
    return {
      success: {
        value: false,
        reason: error.message,
      },
    };
  }
}
