export default function evaluate_product_bm_url(product_url_string) {
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
        valid: {
          value: false,
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
        valid: {
          value: false,
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
        valid: {
          value: false,
          reason: "Invalid product UUID.",
        },
        bm_uuid: "",
      };
    }
    // ---------------------------------------------------------------------------------- //

    return {
      valid: {
        value: true,
        reason: "",
      },
      bm_uuid: product_bm_uuid,
    };
  } catch {
    return {
      valid: {
        value: false,
        reason: "Unable to interpret product URL.",
      },
      bm_uuid: "",
    };
  }
}
