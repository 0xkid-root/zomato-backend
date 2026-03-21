const express = require('express');
const router = express.Router();

const {
  registerFoodPartner,
  loginFoodPartner,
  logoutFoodPartner,
} = require('../controllers/food-partner.controller');

router.post('/foodpartner/register', registerFoodPartner);
router.post('/foodpartner/login', loginFoodPartner);
router.post('/foodpartner/logout', logoutFoodPartner);





module.exports = router;