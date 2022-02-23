const pageScraper = require('./pageScraper');
async function scrapeAll(browserInstance) {
  let browser;
  try {
    browser = await browserInstance;
    catalogUrl = 'https://kugoo-russia.ru/electrosamokaty';
    const productUrls = await pageScraper.scraperListProduct(
      catalogUrl,
      browser,
    );
    productUrls.reduce(async (memo, productUrl) => {
      const results = await memo;
      const productData = await pageScraper.scraperSingleProduct(
        productUrl,
        browser,
      );
      // if (productData) await pageScraper.addProductInFile(productData);
      return [...results, productUrl];
    }, []);
    // const productData = await pageScraper.scraperSingleProduct(
    //   'https://kugoo-russia.ru/electrosamokaty/kugoo-m4pro-13ah',
    //   browser,
    // );
  } catch (err) {
    console.log('Could not resolve the browser instance => ', err);
  }
}

module.exports = (browserInstance) => scrapeAll(browserInstance);
