//All routes for Users are defined here

require("dotenv").config();

const express = require('express');
const router = express.Router();
const mailgunParams = require("../lib/mailgun.js");
const mailgun = require("mailgun-js");

const mg = mailgun(mailgunParams);

//passed to server.js
module.exports = (db) => {

  return router.post("/", (req, res) => {
    const allOptions = [req.body.option1, req.body.option2, req.body.option3, req.body.option4, req.body.option5, req.body.option6, req.body.option7, req.body.option8];
    const allDescriptions = [req.body.description1, req.body.description2, req.body.description3, req.body.description4, req.body.description5, req.body.description6, req.body.description7, req.body.description8];
    // const arrayOfOptions = allOptions.filter((option) => option.length > 0);

    const generateRandomString = () => {
      return Math.floor((1 + Math.random()) * 0x1000000).toString(16).substring(1);
    };

    const link1admin = generateRandomString();
    const link2everyone = generateRandomString();


    db.query(
      `
    INSERT INTO polls (
      email, title, description, administrative_link, submission_link, name_required)
      VALUES (
      $1, $2, $3, $4, $5, $6)
      RETURNING *;
      `, [req.body.email, req.body.title, req.body.description, link1admin, link2everyone, req.body.name_required])

      .then(() => {

        db.query(
          `
          SELECT *
          FROM polls
          WHERE administrative_link = $1
          `, [link1admin])

          .then(result => {

            allOptions.forEach((option, index) => {
              if (option.length > 0) {
                db.query(
                  `
                 INSERT INTO option_results (
                 poll_id, option_name, option_value, option_description)
                 VALUES (
                 $1, $2, $3, $4)
                 RETURNING *;
                 `, [result.rows[0]["id"], option, 0, allDescriptions[index]]

                );
              }

            });

            const data = {
              from: 'Example <EMAIL@EMAIL>',
              to: 'EMAIL@EMAIL',
              subject: 'Hello world',
              text: `Here are your links!\n Share with your friends: localhost:8080/polls/${link2everyone} \n Use to track the results: localhost:8080/results/${link1admin}`
            };
            mg.messages().send(data, function(error, body) {
              if (error) {
                console.log(error);
              }
              console.log(body);
            });

            res.json({ link1admin, link2everyone });
          });

      })

      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
};

