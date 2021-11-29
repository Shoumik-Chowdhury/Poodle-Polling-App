const express = require('express');
const router  = express.Router();

module.exports =  (db) => {
  router.get("/:adminid", (req, res) => {
    let values = [req.params["adminid"]];
    db.
      query(`SELECT * FROM option_results
            WHERE poll_id = $1`, values)
      .then(response => {
        let xVal = [];
        let yVal = [];
        for (let val of response.rows) {
          xVal.push(val.option_name);
          yVal.push(val.option_value);
        }
        res.json({xVal, yVal});
        // res.render('result', { xVal, yVal })
      })
      .catch();
  });
  return router;
}
