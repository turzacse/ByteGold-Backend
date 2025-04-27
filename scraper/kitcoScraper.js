const puppeteer = require('puppeteer');
const MetalPrice = require('../models/MetalPrice');

const scrapeAndSaveKitcoPrices = async () => {
  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.goto('https://www.kitco.com', { waitUntil: 'domcontentloaded' });

    // Wait for necessary elements
    await page.waitForSelector('.MetalMonthHomePage_table__CVlpK');
    await page.waitForSelector('.SilverPricePGMBlock_table__Flgsd');

    // Scrape data
    const metals = await page.evaluate(() => {
      const metalsData = {};

      // Gold
      const goldElement = document.querySelector('.MetalMonthHomePage_table__CVlpK span.ml-auto');
      if (goldElement) metalsData.gold = goldElement.innerText.trim();

      // Silver, Platinum, Palladium
      const metalBlocks = document.querySelectorAll('.SilverPricePGMBlock_table__Flgsd .flex');
      metalBlocks.forEach(block => {
        const name = block.querySelector('a') ? block.querySelector('a').innerText.trim().toLowerCase() : '';
        const price = block.querySelector('span.ml-auto') ? block.querySelector('span.ml-auto').innerText.trim() : '';
        
        if (name.includes('silver')) metalsData.silver = price;
        if (name.includes('platinum')) metalsData.platinum = price;
        if (name.includes('palladium')) metalsData.palladium = price;
      });

      return metalsData;
    });

    await browser.close();

    // Save to database
    const newMetalPrice = new MetalPrice({
      title: 'Kitco Metal Prices',
      description: 'Current metal prices from Kitco',
      source: 'https://www.kitco.com',
      ...metals,
      timestamp: new Date(),
    });

    await newMetalPrice.save();

    console.log('✅ Metal prices scraped and saved to database.');
  } catch (error) {
    console.error('❌ Error scraping Kitco data:', error.message);
  }
};

module.exports = scrapeAndSaveKitcoPrices;
