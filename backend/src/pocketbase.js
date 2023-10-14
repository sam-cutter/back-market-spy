import PocketBase from "pocketbase";
import "dotenv/config";
import { get_product_slug } from "./back_market.js";

export async function init_pocketbase() {
  const pb = new PocketBase("http://127.0.0.1:8090");

  await pb.admins.authWithPassword(
    process.env.POCKETBASE_ADMIN_EMAIL,
    process.env.POCKETBASE_ADMIN_PASSWORD
  );

  return pb;
}

export async function get_tracked_products() {
  const pb = await init_pocketbase();

  const tracked_products = (
    await pb.collection("tracked_products").getFullList()
  ).map((product) => {
    return product.id;
  });

  return tracked_products;
}

export async function add_tracked_product(product_id) {
  const pb = await init_pocketbase();

  const product_data = {
    pb_uuid: product_id,
    slug: await get_product_slug(product_id),
  };

  const tracked_product_record = await pb
    .collection("tracked_products")
    .create(product_data);

  return tracked_product_record.id;
}
