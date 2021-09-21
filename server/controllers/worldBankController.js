/* eslint-disable no-restricted-syntax */
const axios = require('axios');
const { countries } = require('@aerapass/country-data');

const worldBankController = {};

worldBankController.getEconomicData = (req, res, next) => {
  delete countries.all;
  const transposedCountries = {};

  for (let i = 0; i < Object.keys(countries).length; i += 1) {
    const key = countries[Object.keys(countries)[i]];
    transposedCountries[key.name.toLowerCase()] = key.alpha3.toLowerCase();
  }
  const countryCode = transposedCountries[req.params.countryName.toLowerCase()];
  try {
    const url = `https://api.worldbank.org/v2/country/${countryCode}/indicator/DPANUSSPB?format=json`;
    axios({
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      url,
    })
      .then((response) => {
        res.locals.data = response.data;
        next();
      })
      .catch((error) => next(error));
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = worldBankController;
