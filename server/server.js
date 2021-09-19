const express = require('express');

const app = express();
const path = require('path');

// eslint-disable-next-line import/no-dynamic-require
const apiRouter = require(path.join(__dirname, 'routes/api.js'));


if (process.env.NODE_ENV === 'production') {
  app.use('/build', express.static(path.join(__dirname, '../build')));

  app.get('/', (req, res) => res.status(200).sendFile(path.join(__dirname, '../public/index.html')));
}

app.use('/api', apiRouter);

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
