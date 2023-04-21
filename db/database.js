//const { Pool } = require('pg');
const pg = require('pg');

// const db = new pg.Client({
//   host: 'horton.db.elephantsql.com',
//   user: 'ispeoogm',
//   password: process.env.DB_PASSWORD,
//   port: 5432,
//   database: 'ispeoogm'
// })
const connString = process.env.DB_URL;
const db = new pg.Client(connString);

// const db = new Pool({
//   host: 'horton.db.elephantsql.com',
//   user: 'ispeoogm',
//   password: process.env.DB_PASSWORD,
//   port: 5432,
//   database: 'ispeoogm',
// })

db.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log('Connected to db');
  }
})

module.exports = db;