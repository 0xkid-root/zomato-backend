const express = require('express');
const router = express.Router();
const { authFoodPartnerMiddleware,authUserMiddleware } = require('../middlewares/auth.middleware');
const  {getFoodPartnerById} = require('../controllers/food-partner.controller');

const {
  registerFoodPartner,
  loginFoodPartner,
  logoutFoodPartner,
} = require('../controllers/food-partner.controller');

router.post('/foodpartner/register', registerFoodPartner);
router.post('/foodpartner/login', loginFoodPartner);
router.post('/foodpartner/logout', logoutFoodPartner);

router.get('/foodpartner/:id',authUserMiddleware, getFoodPartnerById);



module.exports = router;