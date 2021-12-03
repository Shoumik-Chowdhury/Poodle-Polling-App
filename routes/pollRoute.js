const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/:pollid", (req, res) => {
    let values = [req.params["pollid"]];
    db.
      query(`SELECT option_results.*, polls.title, polls.description, polls.name_required
            FROM option_results
            JOIN polls ON poll_id = polls.id
            WHERE submission_link = $1`, values)
      .then(response => {
        const options = response.rows
        res.render('poll', { options });
      })
      .catch((err) => err);
  });
  return router;
}
