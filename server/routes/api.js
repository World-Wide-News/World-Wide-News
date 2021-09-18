// const express = require('express');
// const apiController = require('../controllers/apiController');

// const router = express.Router();

// // router.get('/', apiController.getData, (req, res) => {
// //   res.send('yes');
// // });

// router.get('/map', apiController.createMap, (req, res) => {
//   res.send(res.locals.data).status(200);
// });

// router.get('/station/:id',
//   apiController.getSubwayData,
//   (req, res) => {
//     res.status(200).json(res.locals.subway);
//   });

// router.get('/wikiStation/:id',
//   apiController.getSubwayData,
//   apiController.fetchSubwayWiki,
//   (req, res) => {
//     res.status(200).json(res.locals.search);
//   });

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

// module.exports = router;
