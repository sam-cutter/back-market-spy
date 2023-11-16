import track_product from "./spy/track_product.js";
import snapshot_all_products from "./spy/snapshot_all_products.js";

const product_urls = [
  "https://www.backmarket.co.uk/en-gb/p/iphone-12-pro-128-gb-pacific-blue-unlocked/6cc9b52b-c002-4963-9655-cb567edd13a3#l=12",
  "https://www.backmarket.co.uk/en-gb/p/iphone-12-mini-128-gb-green-unlocked/3633babc-f8b0-4f1e-89e3-edd649f279d1#l=12",
  "https://www.backmarket.co.uk/en-gb/p/apple-watch-magnetic-fast-charger-to-usb-c-cable-1m/e862b250-497f-4ee2-9921-6388556287b9#l=10",
];

for (const product_url of product_urls) {
  console.log(product_url);
  console.log(await track_product(product_url));
}
