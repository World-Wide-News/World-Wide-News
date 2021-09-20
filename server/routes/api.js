const express = require('express');
const apiController = require('../controllers/apiController');

const router = express.Router();

router.get('/population/:countryName', apiController.getData, (req, res) => res.status(200).json(res.locals.population));

router.get('/getArticles/:countryName', apiController.getArticles, (req, res) => res.status(200).json(res.locals.articles));

// router.get('/map', apiController.createMap, (req, res) => {
//   res.send(res.locals.data).status(200);
// });

// router.post('/signup',
//   apiController.createUser,
//   (req, res) => {
//     res.status(200).send(res.locals.user);
//   });

// router.post('/login',
//   apiController.verifyUser,
//   apiController.getUserData,
//   (req, res) => {
//     res.status(200).json(res.locals.data);
//   });

// router.post('/addFav/?:subway',
//   apiController.addFav,
//   (req, res) => {
//     res.status(200).send(res.locals.user);
//   });

module.exports = router;
