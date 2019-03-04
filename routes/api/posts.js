const express = require('express');
const router = express.Router();

//@route to get api test
//@desc test post route
//@access Public
router.get('/test', (req, res) => res.json({msg: "Posts Work"}));

module.exports = router;