const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({extended: true}));

module.exports = (db) => {//passed to server.js
  return router.post("/", (req, res) => {
    let rankArray = req.body.decision_maker;
    rankArray.forEach(element => {
      console.log(element);
    });
  });
};
