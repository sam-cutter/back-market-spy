import init_pocketbase from "./init_pocketbase.js";

export default async function get_tracked_products() {
  try {
    const pb = await init_pocketbase();

    const tracked_products = (
      await pb.collection("tracked_products").getFullList()
    ).map((product_record) => {
      return { record_id: product_record.id, bm_uuid: product_record.bm_uuid };
    });

    return {
      success: {
        value: true,
        reason: "",
      },
      data: {
        items: tracked_products,
      },
    };
  } catch (error) {
    return {
      success: {
        value: false,
        reason: error.message,
      },
      data: {
        items: undefined,
      },
    };
  }
}
