const express = require('express');
const protect = require('../middlewares/protect')
const {   getallproducts,setMarketPlaceProduct,deleteMarketPlaceProduct,getproducts} = require('../controllers/MarketPlacecontroller');
const router = express.Router()




router.route('/').get(protect, getproducts).post(protect, setMarketPlaceProduct)
router.route('/getallproducts').get(getallproducts)

module.exports = router