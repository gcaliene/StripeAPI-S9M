const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongo = require('mongo');
const mongoose = require('mongoose');


const app = express();

const { PORT, DATABASE_URL } = require('./config');

require('./routes/billingRoutes')(app);


let server;

function runServer(databaseUrl = DATABASE_URL || "No Database currently being used.", port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app
        .listen(port, () => {
          console.log(
            `Time to work! Your app is listening on port ${port} and db at${databaseUrl}`
          );
          resolve();
        })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('I guess this means you are done. Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };