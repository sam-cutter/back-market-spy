import init_pocketbase from "./init_pocketbase.js";

export default async function is_product_tracked(product_bm_uuid) {
  try {
    const pb = await init_pocketbase();

    const tracked_products_matching_bm_uuid = await pb
      .collection("tracked_products")
      .getFullList({
        filter: `bm_uuid = "${product_bm_uuid}"`,
      });

    const product_is_tracked = tracked_products_matching_bm_uuid.length > 0;

    return {
      success: {
        value: true,
        reason: "",
      },
      data: {
        tracked: product_is_tracked,
      },
    };
  } catch (error) {
    return {
      success: {
        value: false,
        reason: error.message,
      },
      data: {
        tracked: undefined,
      },
    };
  }
}
