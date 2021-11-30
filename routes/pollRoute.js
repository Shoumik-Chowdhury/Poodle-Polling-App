const express = require('express');
const router  = express.Router();

module.exports =  (db) => {
  router.get("/:pollid", (req, res) => {
    let values = [req.params["pollid"]];
    db.
      query(`SELECT * FROM option_results
            JOIN polls ON poll_id = polls.id
            WHERE submission_link = $1`, values)
      .then(response => {

        res.render('poll', templateVars);
      })
      .catch((err) => err);
  });
  return router;
}
