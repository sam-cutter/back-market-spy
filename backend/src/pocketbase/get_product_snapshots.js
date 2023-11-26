import init_pocketbase from "./init_pocketbase.js";

export default async function get_product_snapshots(product_record_id) {
  try {
    const pb = await init_pocketbase();

    let product_snapshots = {
      10: [],
      11: [],
      12: [],
    };

    for (let grade = 10; grade <= 12; grade++) {
      product_snapshots[`${grade}`] = (
        await pb.collection("product_snapshots").getFullList({
          filter: `product = "${product_record_id}" && grade = "${grade}"`,
        })
      ).map((snapshot_record) => {
        return {
          created: snapshot_record.created,
          price: snapshot_record.price_gbp,
          available: snapshot_record.available,
        };
      });
    }

    return {
      success: {
        value: true,
        reason: "",
      },
      data: {
        product_snapshots: product_snapshots,
      },
    };
  } catch (error) {
    return {
      success: {
        value: false,
        reason: error.message,
      },
      data: {
        product_snapshots: [],
      },
    };
  }
}
