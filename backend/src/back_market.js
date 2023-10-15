export function extract_product_bm_uuid(product_url_string) {
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

export function extract_product_condition(product_url_string) {
  try {
    const product_url = new URL(product_url_string);
    const product_url_hash = product_url.hash;

    const product_url_condition_match = product_url_hash.match(/#l=(\d+)/);

    if (product_url_condition_match && product_url_condition_match[1]) {
      return parseInt(product_url_condition_match[1]);
    } else {
      return product_condition_options.Fair();
    }
  } catch (error) {
    return "Invalid product URL.";
  }
}

export const product_condition_options = {
  Fair: 12,
  Good: 11,
  Excellent: 10,
};

export async function get_product_data(product_bm_uuid, condition) {
  const product_request_url = `https://www.backmarket.co.uk/bm/product/${product_bm_uuid}/pickers`;

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
      const product_data = {
        slug: product_item.link.params.slugV2,
        in_stock: product_item.available,
        price: product_item.price.amount,
      };
      return product_data;
    } else {
      throw new Error(`Product price not found.`);
    }
  } catch (error) {
    console.error(error);
  }
}
