// const axios = require('axios');
// const path = require('path');
// const fs = require('fs');
// const bcrypt = require('bcryptjs');
// const models = require('../models/mtaModels');

// const cleanDataPath = path.join(__dirname, '../data-organization/dataClean.csv');

// const dataCSVRead = async (filePath) => {
//   const csvFile = fs.readFileSync(filePath, { encoding: 'UTF-8' });
//   const dataOut = await $.csv.toObjects(csvFile);
//   return dataOut;
// };

// // const requestSettings = {
// //   method: 'GET',
// //   url: 'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs',
// //   encoding: null,
// //   headers: {
// //     'x-api-key': 'WiNUowkkzp9mrjVv9CR0v8hV332e9iWT1jTAcE87',
// //   },

// //   responseType: 'arraybuffer',

// //   transformResponse: [function (data) {
// //     return GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(data);
// //   }],

// // };

// const apiController = {};

// apiController.getData = async (req, res, next) => {
//   // const mtaOut = [];

//   // const { data } = await axios(requestSettings);

//   // data.entity.forEach((elem) => mtaOut.push(elem));

//   // // console.log(mtaOut[0])

//   // for (let i = 10; i < 20; i++) {
//   //   console.log(mtaOut[i]);
//   // }

//   res.sendStatus(200);
// };

// apiController.createMap = async (req, res, next) => {
//   try {
//     const sorted = await dataCSVRead(cleanDataPath);

//     res.locals.data = sorted;
//     next();
//   } catch {
//     next({
//       log: 'Express error handler caught middleware error in apiController.createMap',
//       status: 500,
//       message: { err: 'An error occurred' },
//     });
//   }
// };

// apiController.getSubwayData = async (req, res, next) => {
//   const { id } = req.params;

//   try {
//     const subway = await models.Subways.findOne({ subwayStop: id });
//     res.locals.subway = subway;
//     next();
//   } catch (err) {
//     next({
//       log: 'Express error handler caught in apiController.getSubwayData middleware',
//       status: 500,
//       message: { err },
//     });
//   }
// };

// apiController.fetchSubwayWiki = async (req, res, next) => {
//   try {
//     const { subway } = res.locals;

//     const googleSearch = `http://google.com/search?q=${subway.stop_name}%20nyc%20subway%20station%20wikipedia`;
//     res.locals.search = googleSearch;
//     next();
//   } catch (err) {
//     next({
//       log: 'Express error handler caught in apiController.getSubwayData middleware',
//       status: 500,
//       message: { err },
//     });
//   }
// };

// apiController.createUser = async (req, res, next) => {
//   try {
//     const { username, password } = req.body;

//     const newUser = {
//       username,
//       password,
//     };

//     const user = await models.Users.findOne({ username });
//     if (user) return res.send('User already created').status(304);

//     await models.Users.create(newUser);

//     console.log(`User: ${username} signed up`);

//     res.locals.user = username;
//     return next();
//   } catch (err) {
//     console.log(err);
//     return next({
//       log: 'Express error handler caught in apiController.createUser middleware',
//       status: 500,
//       message: { err },
//     });
//   }
// };

// apiController.verifyUser = async (req, res, next) => {
//   try {
//     const { username, password } = req.body;
//     // console.log(username, password);

//     const user = await models.Users.findOne({ username });

//     const hashedPW = user.password;

//     const compare = bcrypt.compareSync(password, hashedPW);

//     if (!compare) throw Error('Incorrect username or password. Please try again.');

//     console.log(`User: ${username} logged in`);
//     res.locals.user = username;
//     next();
//   } catch (err) {
//     next({
//       log: 'Express error handler caught in apiController.verifyUser middleware',
//       status: 500,
//       message: { err },
//     });
//   }
// };

// apiController.getUserData = async (req, res, next) => {
//   try {
//     const user = await models.Users.findOne({ username: res.locals.user });

//     const favoriteSubways = user.favorites.map((elem) => elem.name);

//     res.locals.data = favoriteSubways;
//     next();
//   } catch (err) {
//     next({
//       log: 'Express error handler caught in apiController.getUserData middleware',
//       status: 500,
//       message: { err },
//     });
//   }
// };

// apiController.addFav = async (req, res, next) => {
//   try {
//     const { currentUser, subwayStation } = req.body;

//     const query = {
//       username: currentUser,
//     };

//     const update = {
//       favorites: { name: subwayStation },
//     };

//     await models.Users.findOneAndUpdate(query, { $push: update });

//     next();
//   } catch (err) {
//     next({
//       log: 'Express error handler caught in apiController.addFav middleware',
//       status: 500,
//       message: { err },
//     });
//   }
// };

// module.exports = apiController;
