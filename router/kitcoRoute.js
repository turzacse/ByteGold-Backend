const express = require('express');
const router = express.Router();
const { getKitcoPrices, getAllKitcoPrices } = require('../controllers/kitcoController');

router.get('/', getKitcoPrices);
router.get('/all', getAllKitcoPrices);

module.exports = router;
