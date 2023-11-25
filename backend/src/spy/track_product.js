import evaluate_product_bm_url from "../back_market/evaluate_product_bm_url.js";
import is_product_tracked from "../pocketbase/is_product_tracked.js";
import add_tracked_product from "../pocketbase/add_tracked_product.js";
import generate_product_snapshot from "./generate_product_snapshot.js";
import get_product_name from "../back_market/get_product_name.js";

export default async function track_product(product_bm_url) {
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

  // ---------------------------------------------------------------------------------- //
  const product_name_get = await get_product_name(product_bm_uuid);

  if (!product_name_get.success.value) {
    return {
      success: {
        value: false,
        reason: "Unable to get product name.",
      },
    };
  }

  const product_name = product_name_get.data.name;
  // ---------------------------------------------------------------------------------- //

  // ---------------------------------------------------------------------------------- //
  // Attempt to add the product to the tracked_products table.
  const tracked_product_add_result = await add_tracked_product(
    product_bm_uuid,
    product_name
  );

  if (!tracked_product_add_result.success.value) {
    return {
      success: {
        value: false,
        reason: tracked_product_add_result.success.reason,
      },
      product_bm_uuid: undefined,
    };
  }

  const product_record_id = tracked_product_add_result.data.record_id;
  // ---------------------------------------------------------------------------------- //

  // ---------------------------------------------------------------------------------- //
  // Generate an intial product snapshot for the product
  const product_snapshot_generation_result = await generate_product_snapshot(
    product_bm_uuid,
    product_record_id
  );

  if (!product_snapshot_generation_result.success.value) {
    return {
      success: {
        value: false,
        reason: product_snapshot_generation_result.success.reason,
      },
      product_bm_uuid: undefined,
    };
  }
  // ---------------------------------------------------------------------------------- //

  return {
    success: {
      value: true,
      reason: "",
    },
    product_bm_uuid: product_bm_uuid,
  };
}
