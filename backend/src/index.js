import cron from "node-cron";
import snapshot_all_products from "./spy/snapshot_all_products.js";

cron.schedule("*/15 * * * *", async () => {
  console.log("Snapshotting all products.");
  await snapshot_all_products();
});
