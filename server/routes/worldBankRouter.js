const express = require('express');
const worldBankController = require('../controllers/worldBankController');

const router = express.Router();

router.get(
  '/economic/:countryName',
  worldBankController.getEconomicData,
  (req, res, next) => {
    res.status(200).send(res.locals.data);
  }
);

module.exports = router;
