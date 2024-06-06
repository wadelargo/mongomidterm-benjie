const express = require('express');

const {connectDb, getDb} = require('./db');
const { MongoDBCollectionNamespace } = require('mongodb');

const app = express();

const cors = require('cors');
app.use(cors());

let dbConn

connectDb((err) => {
    if(!err) {
     app.listen(3003, () => {
            console.log('Server is now Listening at port 3003')
        })
        dbConn = getDb()    

    }else {
        console.error(err);
    }app.get('/Products', (req, res) => {
        const Products = [];
        dbConn.collection('Products')
            .find()
            .toArray()
            .then((result) => {
                Products.push(...result);
                res.status(200).json(Products);
            })
            .catch((error) => {
                console.error("Error fetching Products:", error);
                res.status(500).json({ error: 'Could not fetch the documents' });
            });
    });
})

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to this awesome API!!'
    })
})


app.get('/Office', (req, res) => {
    const office = [];
    dbConn.collection('office')
        .find()
        .toArray()
        .then((result) => {
            office.push(...result);
            res.status(200).json(office);
        })
        .catch((error) => {
            console.error("Error fetching Office:", error);
            res.status(500).json({ error: 'Could not fetch the documents' });
        });
});