import express from 'express';
import mongoose from 'mongoose';
import expressValidator from 'express-validator';
import logger from 'morgan';
import path from 'path';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import routes from './routes';

dotenv.config();

// const dbUser = process.env.DB_USER;
// const dbPassword = process.env.DB_PASSWORD;
const port = parseInt(process.env.PORT, 10) || 8000;

// database config
const configDB = require('./config/database');

// Set up the express app
const app = express();
const publicPath = express.static(path.join(__dirname, './index.html'));


let webpackConfig;
mongoose.Promise = global.Promise;

// Setup a default catch-all route that sends back a welcome message in JSON format.
if (process.env.NODE_ENV !== 'production') {
  if (process.env.NODE_ENV === 'test') {
    mongoose.connect(configDB.url_test);
  } else {
    mongoose.connect(configDB.url);
  }
} else {
  mongoose.connect(configDB.url_production);
}

// Log requests to the console.
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

if (process.env.NODE_ENV === 'development') {
  webpackConfig = require('../webpack.dev'); //eslint-disable-line
  const compiler = webpack(webpackConfig);
  app.use(webpackMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
  }));
  app.use(webpackHotMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    historyApiFallback: true,
    stats: { colors: true }
  }));

  app.use(webpackHotMiddleware(compiler));
}

app.use(routes);
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

app.listen(port, (err) => {
  if (err) {
    console.log(err, 'but stuff works'); //eslint-disable-line
  } else {
    console.log(`We are live on port ${port}...`.green); //eslint-disable-line
  }
});

module.exports = app;
