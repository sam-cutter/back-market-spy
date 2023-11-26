import init_pocketbase from "./init_pocketbase.js";

export default async function get_product_record_id(product_bm_uuid) {
  try {
    const pb = await init_pocketbase();

    const product_record_id = (
      await pb
        .collection("tracked_products")
        .getFirstListItem(`bm_uuid = "${product_bm_uuid}"`)
    ).id;

    return {
      success: {
        value: true,
        reason: "",
      },
      data: {
        record_id: product_record_id,
      },
    };
  } catch (error) {
    return {
      success: {
        value: false,
        reason: error.message,
      },
      data: {
        record_id: "",
      },
    };
  }
}

console.log(
  await get_product_record_id("b5ebc79d-0304-41a6-b1ae-d2a487afa11f")
);
