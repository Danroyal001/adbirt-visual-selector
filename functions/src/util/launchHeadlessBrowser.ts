import puppeteer from "puppeteer";

const launchHeadlessChrome = async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--window-size=2000,1000"],
    dumpio: true,
  });

  return browser;
};

export default launchHeadlessChrome;
