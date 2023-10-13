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
