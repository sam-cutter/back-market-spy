import {
  extract_product_id,
  get_product_price,
  product_condition_options,
} from "./back_market.js";

const product_id = extract_product_id(
  "https://www.backmarket.co.uk/en-gb/p/iphone-12-64-gb-black-unlocked/ec0b1d0d-251d-456e-bcd6-978be85e25d6#l=12"
);

const product_price = await get_product_price(
  product_id,
  product_condition_options.Fair
);

console.log(product_price);
