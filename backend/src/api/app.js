import express from "express";
import track_product from "../spy/track_product.js";

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/api/track_product/:product_bm_url", async (request, response) => {
  const product_bm_url = request.params.product_bm_url;

  const product_tracking_result = await track_product(product_bm_url);

  response.json(product_tracking_result);
});
