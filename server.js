const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

const app = express();
let db;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

// let cities = [
//     {
//         id:1,
//         name: 'London'
//     },
//     {
//         id:2,
//         name: 'Warsaw'
//     },
//     {
//         id:3,
//         name:'Philadelphia'
//     },
//     {
//         id:4,
//         name:'Hamilton'
//     }
// ]

app.get('/', function(req, res){
    res.send('you on my API')
})

app.get('/cities', function (req, res){
    db.collection('cities').find().toArray((err, docs) => {
        if (err) throw err;
        res.send(docs)
    })
})

app.get('/cities/:id', function (req, res){
    db.collection('cities').findOne({_id: ObjectId(req.params.id)}, (err, docs) => {
        if (err) throw err;
        res.send(docs)
        console.log(docs)
    });
})

app.post('/cities', function (req, res){
    const city = { name: req.body.name };

    db.collection('cities').insertOne(city, (err, result) => {
        if (err) throw err;
        res.send(city)
        console.log(result)
    })
})

app.put('/cities/:id',  (req, res) => {
    db.collection('cities')
        .updateOne(
            { _id: ObjectId(req.params.id) },
            { $set:{ name: req.body.name } },   // don't forget to use {$ set: {...}}
            (err, result) => {
                if (err) throw err;
                res.sendStatus(200)
            }
        )
})

// alternative method
// app.put('/cities/:id',  (req, res) => {
//     db.collection('cities')
//     .updateOne(
//         { _id: ObjectId(req.params.id) },
//         { $set:{ name: req.body.name } },   // don't forget to use {$ set: {...}}
//         {upsert: true}
//     )
//     .then((obj) => {
//         console.log('Updated - ' + obj);
//         res.sendStatus(200)
//     })
//     .catch((err) => {
//         console.Error('Error: ' + err);
//     })
// })

app.delete('/cities/:id', function (req, res){
    db.collection('cities').deleteOne({ _id: ObjectId(req.params.id)}, (err, result) => {
        if (err) throw err;
        res.sendStatus(200)
    })
})

MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    if (err) throw err
    db = client.db('myapi');

    app.listen(3008, function (){
        console.log('API started with db')
    })
})
