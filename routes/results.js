const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/:adminid", (req, res) => {
    let values = [req.params["adminid"]];
    db.
      query(`SELECT option_name, option_value, title, email FROM option_results
            JOIN polls ON poll_id = polls.id
            WHERE administrative_link = $1`, values)
      .then(response => {
        let xVal = [];
        let yVal = [];
        for (let val of response.rows) {
          xVal.push([val.option_name]);
          yVal.push([val.option_value]);
        }
        let title = response.rows[0].title;
        let email = response.rows[0].email;
        res.render('result', { xVal, yVal, title, email });
      })
      .catch((err) => err);
  });
  return router;
}
