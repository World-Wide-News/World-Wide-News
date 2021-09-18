const apiRouter = require('./routes/api.js');
const express = require('express');

const app = express();
const path = require('path');

app.use(express.json());


app.use('/api',apiRouter);

// import in the controller method


// // eslint-disable-next-line import/no-dynamic-require
// const apiRouter = require(path.join(__dirname, 'routes/api.js'));

app.get('/getDetails', detailsController.getDetails, (req, res) => {
    // console.log(res.locals.articles);
    console.log('Here in the last method that sends the response');
    return res.status(200).send(res.locals.articles);
  });

if (process.env.NODE_ENV === 'production') {
  app.use('/build', express.static(path.join(__dirname, '../build')));

  app.get('/', (req, res) => res.status(200).sendFile(path.join(__dirname, '../public/index.html')));
}

app.use('/*', (req, res) => {
  res.status(404).sendFile(path.join(__dirname, '../public/client/HTML404Page.html'));
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = { ...defaultErr, ...err };
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(3000, () => console.log('Listening on 3000'));
