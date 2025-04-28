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
    res.status(500).json({ error: 'Failed to fetch all data.', msg: error.message });
  }
};


module.exports = {
  getKitcoPrices,
  getAllKitcoPrices,
};
