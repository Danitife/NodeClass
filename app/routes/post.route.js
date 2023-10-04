const express = require('express');
const { index } = require('../controllers/post.controller');

const router = express.Router();

router.get("/", index)

module.exports = router