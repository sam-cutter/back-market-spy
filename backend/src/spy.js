import { get_product_data, evaluate_product_bm_url } from "./back_market.js";
import {
  add_product_snapshot,
  is_product_tracked,
  add_tracked_product,
} from "./pocketbase.js";

export async function generate_product_snapshot(
  product_bm_uuid,
  product_record_id
) {
  const product_data = (await get_product_data(product_bm_uuid)).data.items;

  for (const product of product_data) {
    await add_product_snapshot(
      product_record_id,
      product.grade,
      product.available,
      product.price_gbp
    );
  }
}

export async function track_product(product_bm_url) {
  // ---------------------------------------------------------------------------------- //
  // Evaluate the Back Market product URL. If the URL is invalid,
  // product tracking is unsuccessful.
  const product_bm_url_evaluation = evaluate_product_bm_url(product_bm_url);

  if (!product_bm_url_evaluation.valid.value) {
    return {
      success: {
        value: false,
        reason: product_bm_url_evaluation.valid.reason,
      },
      product_bm_uuid: undefined,
    };
  }
  // ---------------------------------------------------------------------------------- //

  const product_bm_uuid = product_bm_url_evaluation.bm_uuid;

  // ---------------------------------------------------------------------------------- //
  // Check whether the product is already being tracked in the tracked_products collection.
  // If the check was unsuccessful, product tracking is unsuccessful. If the check returns
  // that the product is already being tracked, product tracking is successful
  const product_tracked_check = await is_product_tracked(product_bm_uuid);

  if (!product_tracked_check.success.value) {
    return {
      success: {
        value: false,
        reason: product_tracked_check.success.reason,
      },
      product_bm_uuid: undefined,
    };
  }

  if (product_tracked_check.data.tracked) {
    return {
      success: {
        value: true,
        reason: "Product is already being tracked.",
      },
      product_bm_uuid: product_bm_uuid,
    };
  }
  // ---------------------------------------------------------------------------------- //

  const product_record_id = await add_tracked_product(product_bm_uuid);

  await generate_product_snapshot(product_bm_uuid, product_record_id);

  return product_bm_uuid;
}

console.log(
  await track_product(
    "https://www.backmarket.co.uk/en-gb/p/iphone-12-256-gb-black-unlocked/86ce7095-db99-4d6f-a800-a48a7fa5db2f#l=12&scroll=false"
  )
);
