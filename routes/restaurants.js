const express = require('express');
const router = express.Router();
const {getRestaurants, addReview, getRestaurant, updateRestaurants, deleteRestaurants, createRestaurants} = require('../controllers/restaurants');

router.get('/',getRestaurants);
router.get('/:id',getRestaurant);
router.post('/create',createRestaurants);
router.post('/:id/addReview',addReview)
router.put('/update/:id',updateRestaurants);
router.delete('/delete/:id',deleteRestaurants);

module.exports = router;