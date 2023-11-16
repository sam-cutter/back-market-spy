export default async function get_product_data(product_bm_uuid) {
  const product_request_url = `https://www.backmarket.co.uk/bm/product/${product_bm_uuid}/pickers`;

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
    const product_grade_picker = product_data.pickers.find(
      (picker) => picker.id && picker.id === "grades"
    );

    // ---------------------------------------------------------------------------------- //
    // If we are unable to find the product grade picker
    if (!product_grade_picker) {
      throw new Error("Grade picker not found within product pickers.");
    }
    // ---------------------------------------------------------------------------------- //

    // ---------------------------------------------------------------------------------- //
    // Map the product data into an array. When the product is unavailable,
    // it won't have a price, so leave as undefined
    const product_items = product_grade_picker.items.map(
      (product_item, index) => {
        const grade = 12 - index;
        const price_gbp = product_item.available
          ? product_item.price.amount
          : undefined;

        return {
          grade: grade,
          available: product_item.available,
          price_gbp: price_gbp,
        };
      }
    );
    // ---------------------------------------------------------------------------------- //

    return {
      success: {
        value: true,
        reason: "",
      },
      data: {
        items: product_items,
      },
    };
  } catch (error) {
    return {
      success: {
        value: false,
        reason: error.message,
      },
      data: {
        items: [],
      },
    };
  }
}
