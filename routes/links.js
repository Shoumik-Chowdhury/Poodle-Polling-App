/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();


module.exports = (db) => {//passed to server.js
  return router.post("/", (req, res) => {
    console.log('here')

    const generateRandomString = () => {
      return Math.floor((1 + Math.random()) * 0x1000000).toString(16).substring(1);
    };
    const link1admin = generateRandomString();
    const link2everyone = generateRandomString();

    //insert into polls 
    db.query(`
    INSERT INTO polls (
      email, title, description, administrative_link, submission_link) 
      VALUES (
      $1, $2, $3, $4, $5)
      RETURNING *;
      `, [req.body.email, req.body.title, req.body.description, link1admin, link2everyone])
      //insert into options
      .then(result => {
        console.log("RESULT DATABASE", result.rows[0]);
        return result.rows[0];
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
};



// const pg = require('pg');
// const { Pool } = require('pg');
// const properties = require('./json/properties.json');
// const users = require('./json/users.json');


// const pool = new Pool({
//   user: 'vagrant',
//   password: '123',
//   host: 'localhost',
//   database: 'lightbnb'
// });

// const addPoll = function(poll) {
//   const generateRandomString = () => {
//     return Math.floor((1 + Math.random()) * 0x1000000).toString(16).substring(1);
//   };
//   //generate 2 links
//   const link1admin = generateRandomString();
//   const link2everyone = generateRandomString();

//   return pool
//     .query(`
//     INSERT INTO users (
//       name, email, password) 
//       VALUES (
//       $1, $2, $3, ${link1admin}, ${link2everyone})
//       RETURNING *;
//       `, [poll.email, poll.title, poll.description])
//     .then(result => {
//       return result.rows[0];
//     })
//     .catch(err => {
//       return null;
//     });

// };
// exports.addPoll = addPoll;
