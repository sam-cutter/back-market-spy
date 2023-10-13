function extract_product_id(product_url_string) {
  try {
    const product_url = new URL(product_url_string);
    const product_url_path_segments = product_url.pathname.split("/");

    for (let i = 0; i < product_url_path_segments.length; i++) {
      if (
        product_url_path_segments[i] == "p" &&
        i + 2 < product_url_path_segments.length
      ) {
        return product_url_path_segments[i + 2];
      }
    }

    return "Product ID not found in product URL.";
  } catch (error) {
    return "Invalid product URL.";
  }
}

const product_condition_options = {
  Fair: 12,
  Good: 11,
  Excellent: 10,
};

async function get_product_price(product_id, condition) {
  const product_request_url = `https://www.backmarket.co.uk/bm/product/${product_id}/pickers`;

  const product_request_headers = new Headers({
    "Accept-Language": "en-gb",
  });

  const product_request_options = {
    method: "GET",
    headers: product_request_headers,
  };

  try {
    const product_request_response = await fetch(
      product_request_url,
      product_request_options
    );

    if (!product_request_response.ok) {
      throw new Error(
        `Response status code was not 200: ${product_request_response.status}.`
      );
    }

    const product_data = await product_request_response.json();

    const product_grade_picker = product_data.pickers.find(
      (picker) => picker.id === "grades"
    );

    if (!product_grade_picker) {
      throw new Error("Condition picker not found within pickers array.");
    }

    const product_item = product_grade_picker.items.find(
      (item) => item.grade.value === condition
    );

    if (product_item) {
      return product_item.price.amount;
    }
  } catch (error) {
    console.error(error);
  }
}
