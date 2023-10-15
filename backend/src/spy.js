import { get_product_data } from "./back_market.js";
import { add_product_snapshot } from "./pocketbase.js";

export async function generate_product_snapshot(
  product_bm_uuid,
  product_record_id
) {
  for (
    let product_condition = 10;
    product_condition <= 12;
    product_condition++
  ) {
    const product_data = await get_product_data(
      product_bm_uuid,
      product_condition
    );

    await add_product_snapshot(
      product_record_id,
      product_condition,
      product_data.in_stock,
      product_data.price
    );
  }
}
