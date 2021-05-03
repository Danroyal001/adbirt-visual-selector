import launchHeadlessBrowser from './launchHeadlessBrowser';

const ssr = async (url: string): Promise<string> => {
  try {
    
    const browser = await launchHeadlessBrowser();

    const tab = await browser.newPage();

    await tab.goto(url, {waitUntill: 'domcontentloaded'} as any);

    const html =  await tab.content();

    await tab.close();

    await browser.close();

    return html.toString();

  } catch (error) {
    const html = '<strong>Error</strong>'

    return html.toString();
  }
}

export default ssr;
