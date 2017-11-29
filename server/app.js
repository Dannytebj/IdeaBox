import express from 'express';
import mongoose from 'mongoose';
import logger from 'morgan';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import routes from './routes';

dotenv.config();

// const dbUser = process.env.DB_USER;
// const dbPassword = process.env.DB_PASSWORD;
const port = parseInt(process.env.PORT, 10) || 8000;

// database config
const configDB = require('./config/database');

console.log(configDB);

if (process.env.NODE_ENV !== 'production') {
  mongoose.connect(configDB.url); // connect to our database
} else {
  mongoose.connect(configDB.url_production); // connect to our database
}
// mongoose.connect(`mongodb://${dbUser}:${dbPassword}@ds119446.mlab.com:19446/todolist`)
// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes);

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

// const server = http.createServer(app);

app.listen(port, (err) => {
  if (err) {
    console.log(err, 'but stuff works');
  } else {
    console.log(`We are live on port ${port}...`.green);
  }
});

export default app;
