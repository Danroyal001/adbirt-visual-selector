import launchHeadlessBrowser from "./launchHeadlessBrowser";

const ssr = async (url: string): Promise<string> => {
  try {
    const browser = await launchHeadlessBrowser();

    const tab = await browser.newPage();

    await tab.goto(url, { waitUntill: "domcontentloaded" } as any);

    await tab.evaluate(() => {

      const rel_to_abs = (url: string) => {
        /* Only accept commonly trusted protocols:
         * Only data-image URLs are accepted, Exotic flavours (escaped slash,
         * html-entitied characters) are not supported to keep the function fast */
      if(/^(https?|file|ftps?|mailto|javascript|data:image\/[^;]{2,9};):/i.test(url))
             return url; //Url is already absolute
    
        var base_url = `${location.href.match(/^(.+)\/?(?:#.+)?$/)!![0]}/`;
        if(url.substring(0,2) == "//")
            return location.protocol + url;
        else if(url.charAt(0) == "/")
            return location.protocol + "//" + location.host + url;
        else if(url.substring(0,2) == "./")
            url = "." + url;
        else if(/^\s*$/.test(url))
            return ""; //Empty = Return nothing
        else url = "../" + url;
    
        url = base_url + url;
        //var i=0
        while(/\/\.\.\//.test(url = url.replace(/[^\/]+\/+\.\.\//g,"")));
    
        /* Escape certain characters to prevent XSS */
        url = url.replace(/\.$/,"").replace(/\/\./g,"").replace(/"/g,"%22")
                .replace(/'/g,"%27").replace(/</g,"%3C").replace(/>/g,"%3E");
        return url;
    }

      Array.from(document.querySelectorAll("a")).forEach((a) => {
        a.href = rel_to_abs(a.href);
      });

      Array.from(document.querySelectorAll("link")).forEach((link) => {
        link.setAttribute('href', rel_to_abs(link.getAttribute('href')!!))
      });

      Array.from(document.querySelectorAll("img")).forEach((img) => {
        img.src = rel_to_abs(img.src)
      });

      Array.from(document.querySelectorAll("script")).forEach((script) => {
        script.src = rel_to_abs(script.src)
      });

      return true;

    });

    const html = await tab.content();

    await tab.close();

    await browser.close();

    return html.toString();
  } catch (error) {
    const html = `<strong>Error: ${error}</strong>`;

    return html.toString();
  }
};

export default ssr;
