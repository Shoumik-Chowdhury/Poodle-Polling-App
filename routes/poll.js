const express = require('express');
const router = express.Router();


module.exports = (db) => {//passed to server.js
  return router.post("/", (req, res) => {
    console.log(req.body);
  });
};
