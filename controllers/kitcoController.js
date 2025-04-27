// const puppeteer = require('puppeteer');

// const getKitcoPrices = async (req, res) => {
//   try {
//     const browser = await puppeteer.launch({
//       headless: 'new',
//       args: ['--no-sandbox', '--disable-setuid-sandbox'],
//     });

//     const page = await browser.newPage();
//     await page.goto('https://www.kitco.com', { waitUntil: 'domcontentloaded' });

//     // Wait for the necessary elements to load
//     await page.waitForSelector('.MetalMonthHomePage_table__CVlpK');
//     await page.waitForSelector('.SilverPricePGMBlock_table__Flgsd');

//     // Extracting the prices
//     const metals = await page.evaluate(() => {
//       const metalsData = {};

//       // Scraping Gold data
//       const goldElement = document.querySelector('.MetalMonthHomePage_table__CVlpK span.ml-auto');
//       if (goldElement) metalsData.gold = goldElement.innerText.trim();

//       // Scraping Silver, Platinum, Palladium prices
//       const metalBlocks = document.querySelectorAll('.SilverPricePGMBlock_table__Flgsd .flex');
//       metalBlocks.forEach(block => {
//         const name = block.querySelector('a') ? block.querySelector('a').innerText.trim().toLowerCase() : '';
//         const price = block.querySelector('span.ml-auto') ? block.querySelector('span.ml-auto').innerText.trim() : '';
        
//         if (name.includes('silver')) metalsData.silver = price;
//         if (name.includes('platinum')) metalsData.platinum = price;
//         if (name.includes('palladium')) metalsData.palladium = price;
//       });

//       return metalsData;
//     });

//     await browser.close();

//     res.json({
//       title : 'Kitco Metal Prices',
//       description: 'Current metal prices from Kitco',
//       source: 'https://www.kitco.com',
//       ...metals,
//       timestamp: new Date(),
//     });
//   } catch (error) {
//     console.error('Error fetching data from Kitco:', error.message);
//     res.status(500).json({ error: 'Failed to fetch metal prices.' });
//   }
// };

// module.exports = { getKitcoPrices };


const MetalPrice = require('../models/MetalPrice');

const getKitcoPrices = async (req, res) => {
  try {
    const latestData = await MetalPrice.findOne().sort({ timestamp: -1 });
    if (!latestData) {
      return res.status(404).json({ error: 'No data found' });
    }
    res.json(latestData);
  } catch (error) {
    console.error('Error fetching from DB:', error.message);
    res.status(500).json({ error: 'Failed to fetch data.' });
  }
};


const getAllKitcoPrices = async (req, res) => {
  try {
    const allData = await MetalPrice.find().sort({ timestamp: -1 }); // latest first
    if (allData.length === 0) {
      return res.status(404).json({ error: 'No data found' });
    }
    res.json(allData);
  } catch (error) {
    console.error('Error fetching all data from DB:', error.message);
    res.status(500).json({ error: 'Failed to fetch all data.' });
  }
};


module.exports = {
  getKitcoPrices,
  getAllKitcoPrices,
};
