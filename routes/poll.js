require("dotenv").config();

const express = require('express');
const router = express.Router();
const mailgunParams = require("../lib/mailgun.js");
const mailgun = require("mailgun-js");

const mg = mailgun(mailgunParams);

module.exports = (db) => {//passed to server.js
  return router.post("/", (req, res) => {

    const rankArray = req.body.rank.decision_maker;
    let optionArray = req.body.optionEntry;
    let pointCount = rankArray.length;
    for (const rank of rankArray) {
      optionArray.forEach(element => {
        if (element.option_name === rank) {
          element.option_value = parseInt(element.option_value);
          element.option_value += pointCount;
          pointCount -= 1;
        }
      });
    }

    optionArray.forEach(element => {
      db.query(`
      UPDATE option_results
      SET option_value = $1
      WHERE id = $2;
      `, [element.option_value, element.id]);
    });

    db.query(
      `
      SELECT administrative_link, submission_link
      FROM polls
      WHERE id = $1
      `, [optionArray[0].poll_id])

      .then((response) => {
        let link1admin = response.rows[0].administrative_link
        let link2everyone = response.rows[0].submission_link

        const data = {
          from: 'poodleteam@poodle.ca',
          to: 'EMAIL@EMAIL',
          subject: 'Submission Confirmation - Poodle',
          text: `One of your friends made a submission! Share with your friends: localhost:8080/polls/${link2everyone} Use to track the results: localhost:8080/results/${link1admin}`
        };
        mg.messages().send(data, function(error, body) {
          if (error) {
            console.log(error);
          }
          console.log(body);
        });
      });

  });
};
