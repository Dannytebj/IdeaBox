'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _expressValidator = require('express-validator');

var _expressValidator2 = _interopRequireDefault(_expressValidator);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackDevMiddleware = require('webpack-dev-middleware');

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

var _webpackHotMiddleware = require('webpack-hot-middleware');

var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

// const dbUser = process.env.DB_USER;
// const dbPassword = process.env.DB_PASSWORD;
var port = parseInt(process.env.PORT, 10) || 8000;

// database config
var configDB = require('./config/database');

// Set up the express app
var app = (0, _express2.default)();
var publicPath = _express2.default.static(_path2.default.join(__dirname, './index.html'));

var webpackConfig = void 0;
_mongoose2.default.Promise = global.Promise;

// Setup a default catch-all route that sends back a welcome message in JSON format.
if (process.env.NODE_ENV !== 'production') {
  if (process.env.NODE_ENV === 'test') {
    _mongoose2.default.connect(configDB.url_test);
  } else {
    _mongoose2.default.connect(configDB.url);
  }
} else {
  _mongoose2.default.connect(configDB.url_production);
  app.get('/dist/*', function (req, res) {
    res.sendFile(_path2.default.join(__dirname, '../../' + req.originalUrl));
  });
}

// Log requests to the console.
app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use((0, _expressValidator2.default)());

if (process.env.NODE_ENV === 'development') {
  webpackConfig = require('../webpack.dev'); //eslint-disable-line
  var compiler = (0, _webpack2.default)(webpackConfig);
  app.use((0, _webpackDevMiddleware2.default)(compiler, {
    publicPath: webpackConfig.output.publicPath
  }));
  app.use((0, _webpackHotMiddleware2.default)(compiler, {
    publicPath: webpackConfig.output.publicPath,
    historyApiFallback: true,
    stats: { colors: true }
  }));
  app.use((0, _webpackHotMiddleware2.default)(compiler));
}

app.use(_routes2.default);
app.get('/*', function (req, res) {
  res.sendFile(_path2.default.join(__dirname, './index.html'));
});

app.listen(port, function (err) {
  if (err) {
    console.log(err, 'but stuff works'); //eslint-disable-line
  } else {
    console.log(('We are live on port ' + port + '...').green); //eslint-disable-line
  }
});

module.exports = app;