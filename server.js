require('dotenv').config();
const express = require('express');
const morgan = require('morgan');

const RestaurantRoute = require('./routes/restaurants');

const app = express();

app.use(express.json())
app.use(morgan('tiny'))
app.use('/restaurants',RestaurantRoute);


const port = process.env.PORT || 3001;
app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
});