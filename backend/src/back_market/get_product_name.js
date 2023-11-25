export default async function get_product_name(product_bm_uuid) {
  const product_request_url = `https://www.backmarket.co.uk/bm/product/${product_bm_uuid}/technical_specifications`;

  try {
    const product_request_response = await fetch(product_request_url, {
      method: "GET",
      headers: { "Accept-Language": "en-gb" },
    });

    // ---------------------------------------------------------------------------------- //
    // If the response code is not 200, something has gone wrong, so throw an error.
    if (!product_request_response.ok) {
      throw new Error(
        `Back Market API returned a non-200 response code: ${product_request_response.status}`
      );
    }
    // ---------------------------------------------------------------------------------- //

    const product_data = await product_request_response.json();
    const product_title = product_data.title;

    // ---------------------------------------------------------------------------------- //
    // If we are unable to find the product grade title
    if (!product_title) {
      throw new Error("Product title not found.");
    }
    // ---------------------------------------------------------------------------------- //

    return {
      success: {
        value: true,
        reason: "",
      },
      data: {
        name: product_title,
      },
    };
  } catch (error) {
    return {
      success: {
        value: false,
        reason: error.message,
      },
      data: {
        name: product_title,
      },
    };
  }
}
