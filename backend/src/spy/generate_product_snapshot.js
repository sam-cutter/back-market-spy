import get_product_data from "../back_market/get_product_data.js";
import add_product_snapshot from "../pocketbase/add_product_snapshot.js";

export default async function generate_product_snapshot(
  product_bm_uuid,
  product_record_id
) {
  try {
    const product_data = await get_product_data(product_bm_uuid);

    if (!product_data.success.value) {
      return {
        success: {
          value: false,
          reason: product_data.success.reason,
        },
      };
    }

    for (const product of product_data.data.items) {
      const product_snapshot = await add_product_snapshot(
        product_record_id,
        product.grade,
        product.available,
        product.price_gbp
      );

      if (!product_snapshot.success.value) {
        return {
          success: {
            value: false,
            reason: product_snapshot.success.reason,
          },
        };
      }
    }

    return {
      success: { value: true, reason: "" },
    };
  } catch (error) {
    return {
      success: {
        value: false,
        reason: error.message,
      },
    };
  }
}
