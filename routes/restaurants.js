const express = require('express');
const router = express.Router();
const {getRestaurants, getRestaurant, updateRestaurants, deleteRestaurants, createRestaurants} = require('../controllers/restaurants');

router.get('/',getRestaurants);
router.get('/:id',getRestaurant);
router.post('/create',createRestaurants);
router.put('/update/:id',updateRestaurants);
router.delete('/delete/:id',deleteRestaurants);

module.exports = router;