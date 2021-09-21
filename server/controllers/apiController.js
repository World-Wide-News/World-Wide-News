const axios = require('axios');
const bcrypt = require('bcryptjs');
const models = require('../models/mapModels');

const apiController = {};

apiController.getPopulationData = (req, res, next) => {
  const { countryName } = req.params;
  const populationRequest = {
    method: 'GET',
    url: 'https://world-population.p.rapidapi.com/population',
    params: { country_name: countryName },
    headers: {
      'x-rapidapi-host': 'world-population.p.rapidapi.com',
      'x-rapidapi-key': '0a9cc778c4msh8ec778a834e5103p1683bajsn6db8490b850c',
    },
  };

  axios.request(populationRequest)
    .then((response) => {
      const { population } = response.data.body;
      res.locals.population = population;
      next();
    }).catch((error) => {
      const defaultErr = {
        log: 'Error handler caught an error inside getPopulationData',
        status: 500,
        message: { err: `An error occurred inside a middleware named getPopulationData : ${error}` },
      };
      next(defaultErr);
    });
};

apiController.getArticles = async (req, res, next) => {
  const { countryName } = req.params;
  // add the request details for the fetch request that will get the news data
  const requestDetails = {
    method: 'GET',
    url: 'https://free-news.p.rapidapi.com/v1/search',
    params: {
      q: countryName, lang: 'en', page: '1', page_size: '5',
    },
    headers: {
      'x-rapidapi-key':
      '0a9cc778c4msh8ec778a834e5103p1683bajsn6db8490b850c',
      // 'c9dd5fae0bmshb0c6910ac9ff173p1739a1jsn7a43e27d0bc4',
      'x-rapidapi-host': 'free-news.p.rapidapi.com',
    },
  };

  axios.request(requestDetails)
    .then((response) => {
      // iterate through the articles recieved and save the required fields in a new object
      const articles = response.data.articles.map((elem) => {
        const objOut = {
          title: elem.title,
          summary: elem.summary,
          link: elem.link,
          media: elem.media,
        };
        return objOut;
      });

      // assign it to res.locals and send back
      res.locals.articles = articles;

      return next();
    }).catch((err) => {
      const defaultErr = {
        log: 'Error handler caught an error inside getArticles',
        status: 500,
        message: { err: `An error occurred inside a middleware named getArticles : ${err}` },
      };
      next(defaultErr);
    });

  // get the country name of the country clicked by the user on the FE and store it in a variable
  // Send a server side request to the API
  // search the API with COUNTRY and SAVE THE RESPONSE
  // using axios, fetch the response and save the required details like Title, Summary, url link
  // call next() and send it to the next middleware
  // send it back to front end as required by the FE
};

// controller function to create a user in the worldwidenews mongoDB if it does not exist

apiController.createUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const newUser = {
      username,
      password,
    };

    const user = await models.Users.findOne({ username });

    if (user) return res.send('User already created').status(304);

    await models.Users.create(newUser);

    console.log(`User: ${username} signed up`);

    res.locals.user = username;
    return next();
  } catch (err) {
    console.log(err);
    return next({
      log: 'Express error handler caught in apiController.createUser middleware',
      status: 500,
      message: { err },
    });
  }
};

// function to verify user when the user tries to login
apiController.verifyUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await models.Users.findOne({ username });

    const hashedPW = user.password;

    const compare = bcrypt.compareSync(password, hashedPW);

    if (!compare) throw Error('Incorrect username or password. Please try again.');

    console.log(`User: ${username} logged in`);
    res.locals.user = username;
    next();
  } catch (err) {
    next({
      log: 'Express error handler caught in apiController.verifyUser middleware',
      status: 500,
      message: { err },
    });
  }
};

// code to get the favourite article links of the user
apiController.getUserData = async (req, res, next) => {
  try {
    const user = await models.Users.findOne({ username: res.locals.user });

    // changed elem => elem.name to elem=>elem.link
    const favoriteArticles = user.favorites.map((elem) => elem);

    res.locals.data = favoriteArticles;
    next();
  } catch (err) {
    next({
      log: 'Express error handler caught in apiController.getUserData middleware',
      status: 500,
      message: { err },
    });
  }
};

// function to add an article link as a favourite

apiController.addFav = async (req, res, next) => {
  try {
    const { currentUser, title, link } = req.body;

    const query = {
      username: currentUser,
    };

    const update = {
      favorites: { title, link },
    };

    await models.Users.findOneAndUpdate(query, { $push: update });

    console.log(`${currentUser} added title: ${title}, link: ${link}`);

    next();
  } catch (err) {
    next({
      log: 'Express error handler caught in apiController.addFav middleware',
      status: 500,
      message: `Express error handler caught in apiController.addFav middleware ${err}`,
    });
  }
};

// add a function to delete an article from the favourite tag
apiController.deleteFav = async (req, res, next) => {
  try {
    const { currentUser, title, link } = req.body;

    const query = {
      username: currentUser,
    };

    const update = {
      favorites: { title, link },
    };

    await models.Users.findOneAndUpdate(query, { $pull: update });

    console.log(`${currentUser} deleted title: ${title}, link: ${link}`);

    next();
  } catch (err) {
    next({
      log: 'Express error handler caught in apiController.deleteFav middleware',
      status: 500,
      message: `Express error handler caught in apiController.deleteFav middleware ${err}`,
    });
  }
};

module.exports = apiController;
