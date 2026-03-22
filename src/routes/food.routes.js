const express = require('express');
const router = express.Router();
const { createFood } = require('../controllers/food.controller');



router.post('/',createFood)

module.exports = router;