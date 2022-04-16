const db = require('../db');
const { formValidator } = require('../helpers/validator');
const {isUnique} = require('../helpers/checkUnique') 



async function getRestaurants(req, res) {
    const results = await db.query("SELECT * FROM restaurants");

    let data = {
        status: true,
        message: "retrieved all restaurants",
        data: results.rows,
        length: results.rows.length
    }

    res.status(201).send(data);
};





async function getRestaurant(req, res) {
    const result = await db.query('SELECT * FROM restaurants WHERE id=$1', [
        req.params.id
    ]);

    let data = {
        status: true,
        message: `retrieved restaurant #${req.params.id}`,
        data: result.rows[0],
        length: result.rows.length
    }

    res.status(201).send(data);
};





async function updateRestaurants(req, res) {
    let result = await formValidator('restaurant', req.body)
    if (result.length > 0) {
        res.status(400).send({ error: result })
    }
    else{
        if (!await isUnique("SELECT COUNT(name) FROM restaurants WHERE name=$1", [req.body.name])) {
            res.status(400).send({ error: 'Restaurant name already exists' })
        }
        else{
            try {
                const results = await db.query("UPDATE restaurants Set name=$1, location=$2, price_range=$3 WHERE id =$4", [
                    req.body.name,
                    req.body.location,
                    req.body.price_range,
                    req.params.id
                ])
                
                let data = {
                    status: true,
                    message: `updated restaurant`,
                    data: req.body,
                    length: results.rows.length
                }
    
                res.status(201).send(data)
            }
            catch (err) {
                console.log(err)
                res.status(500).send({ message: "Something went wrong from the server side" })
            }
        }
    }
}

async function createRestaurants(req, res) {
    let result = await formValidator('restaurant', req.body)
    if (result.length > 0) {
        res.status(400).send({ error: result })
    }
    else {
        //check if unique
        if (!await isUnique("SELECT COUNT(name) FROM restaurants WHERE name=$1", [req.body.name,])) {
            res.status(400).send({ error: 'Restaurant name already exists' })
        }
        else {
            try {
                const results = await db.query("INSERT INTO restaurants (name, location, price_range) VALUES($1,$2,$3)", [
                    req.body.name,
                    req.body.location,
                    req.body.price_range,
                ])
                
                let data = {
                    status: true,
                    message: `created restaurant`,
                    data: req.body,
                    length: results.rows.length
                }

                res.status(201).send(data)
            }
            catch (err) {
                console.log(err)
                res.status(500).send({ message: "Something went wrong from the server side" })
            }
        }
    }
}





async function deleteRestaurants(req, res) {
    res.status(201).send({ message: 'successfully deleted' })
}

module.exports = {
    getRestaurants,
    getRestaurant,
    updateRestaurants,
    createRestaurants,
    deleteRestaurants
}