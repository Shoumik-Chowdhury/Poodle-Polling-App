const express = require('express');
const router  = express.Router();

module.exports =  (db) => {
  router.get("/:adminid", (req, res) => {
    let values = [req.params["adminid"]];
    db.
      query(`SELECT option_name, option_value, title, email FROM option_results
            JOIN polls ON poll_id = polls.id
            WHERE poll_id = $1`, values)
      .then(response => {
        let result = [["Options", "Votes"]];
        for (let val of response.rows) {
          result.push([val.option_name, val.option_value]);
        }
        let title = response.rows[0].title;
        let email = response.rows[0].email;
        res.render('result', {result, title, email});
      })
      .catch((err) => err);
  });
  return router;
}
