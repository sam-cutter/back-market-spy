const puppeteer = require("puppeteer");

async function get_product_price(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  try {
    const price_elements = await page.$x(
      '//*[@id="__layout"]/div/div[2]/div[2]/div/div[4]/div/div/div[2]/div/div/div[1]/div[2]/div[1]/div/div/div/div[2]/h2/div/div[1]'
    );

    if (price_elements.length > 0) {
      const price_element = price_elements[0];

      const price_text = await price_element.evaluate(
        (element) => element.textContent
      );

      const price = Number(price_text.replace(/[^0-9.-]+/g, "").trim());

      console.log(`Product price is ${price}`);
    } else {
      console.log("Product price not found.");
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
  } finally {
    await browser.close();
  }
}

const product_url =
  "https://www.backmarket.co.uk/en-gb/p/iphone-12-128-gb-black-unlocked/f494a8a4-ef58-4a1c-9495-a64d21fed02f#scroll=false";

get_product_price(product_url);
