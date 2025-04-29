const express = require("express");
const router = express.Router();

router.get('/test', (_, res) => res.json({
  msg: 'users'
}))

module.exports = router;