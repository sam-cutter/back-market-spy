export const product_grade_options = {
  Fair: 12,
  Good: 11,
  Excellent: 10,
};

export function evaluate_product_bm_url_string(product_url_string) {
  const VALID_HOSTNAMES = [
    "www.backmarket.co.uk",
    "www.backmarket.fr",
    "www.backmarket.com",
  ];

  try {
    const product_url = new URL(product_url_string);

    // ---------------------------------------------------------------------------------- //
    // If the hostname of the input product URL is not a valid hostname, URL is invalid.
    if (!VALID_HOSTNAMES.includes(product_url.hostname)) {
      return {
        validity: {
          valid: false,
          reason: "Invalid product URL hostname.",
        },
        bm_uuid: "",
      };
    }
    // ---------------------------------------------------------------------------------- //

    const product_url_path_segments = product_url.pathname
      .split("/")
      .filter((segment) => {
        return segment !== "";
      });

    // ---------------------------------------------------------------------------------- //
    // If the pathname of the input product URL does not match the pattern:
    // /:locale/p/:slug/:uuid
    // URL is invalid.
    if (
      product_url_path_segments.length !== 4 ||
      product_url_path_segments[1] !== "p"
    ) {
      return {
        validity: {
          valid: false,
          reason: `Invalid product URL pattern.`,
        },
        bm_uuid: "",
      };
    }
    // ---------------------------------------------------------------------------------- //

    const product_bm_uuid = product_url_path_segments[3];

    const uuid_regex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    // ---------------------------------------------------------------------------------- //
    // If the UUID does not match the common UUID regex, throw an error.
    if (!uuid_regex.test(product_bm_uuid)) {
      return {
        validity: {
          value: false,
          reason: "Invalid product UUID.",
        },
        bm_uuid: "",
      };
    }
    // ---------------------------------------------------------------------------------- //

    return {
      validity: {
        value: true,
        reason: "",
      },
      bm_uuid: product_bm_uuid,
    };
  } catch {
    return {
      validity: {
        valid: false,
        reason: "Unable to interpret product URL.",
      },
      bm_uuid: "",
    };
  }
}

export async function get_product_data(product_bm_uuid, grade) {
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
      throw new Error("grade picker not found within pickers array.");
    }

    const product_item = product_grade_picker.items.find(
      (item) => item.grade.value === grade
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
