import puppeteer from 'puppeteer';

const launchHeadlessChrome = async () => {
  const browser = await puppeteer.launch({
    headless:  true,
    args: ['--no-sandbox'],
    dumpio: true
  });
  
  return browser;
}

export default launchHeadlessChrome;
