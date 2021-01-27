import puppeteer from "puppeteer";

export const crawler = async (url: string) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  await page.screenshot({ path: "example.png" });

  await browser.close();
};
