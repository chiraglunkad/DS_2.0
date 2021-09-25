require('dotenv').config();
const { Pool } = require('pg');
const initOptions = {
  // global event notification;
  error(error, e) {
    if (e.cn) {
      // A connection-related error;
      //
      // Connections are reported back with the password hashed,
      // for safe errors logging, without exposing passwords.
      console.log('CN:', e.cn);
      console.log('EVENT:', error.message || error);
    }
  }
};

const pgp = require('pg-promise')(initOptions);

// console.log(process.env.DB_PASS);
// const connection = new Pool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   database: process.env.DB_DATABASE,
//   password: process.env.DB_PASS,
//   port: process.env.PG_PORT,
//   max: 20,
//   idleTimeoutMillis: 30000,
//   connectionTimeoutMillis: 2000,
// })
//console.log(connection);


const db = pgp('postgresql://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@' + process.env.DB_HOST + ':' + process.env.PG_PORT + '/' + process.env.DB_DATABASE);
db.connect()
  .then(obj => {
    const serverVersion = obj.client.serverVersion;
    console.log('connected to Postgres version: ', serverVersion);
    obj.done(); // success, release the connection;
  })
  .catch(error => {
    console.log('ERROR:', error.message || error);
  });
module.exports = db;
