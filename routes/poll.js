const express = require('express');
const router = express.Router();

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

  });
};
