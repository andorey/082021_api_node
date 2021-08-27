const express = require('express');
const bodyParser = require('body-parser');
const ObjectId = require('mongodb').ObjectId;
const db = require('./db')          //import from module created in db.js
const citiesController = require('./controllers/cities_contr');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('you on my API')
})

app.get('/cities', citiesController.all)

app.get('/cities/:id', citiesController.findById)

app.post('/cities', citiesController.insert)

app.put('/cities/:id',  citiesController.update)

app.delete('/cities/:id', (req, res) => {
    db.get().collection('cities').deleteOne({ _id: ObjectId(req.params.id)}, (err, result) => {
        if (err) throw err;
        res.sendStatus(200)
    })
})

// MongoClient.connect('mongodb://localhost:27017', (err, client) => {
//     if (err) throw err
//     db =  client.db('myapi');
//
//     app.listen(3008, function (){
//         console.log('API started with db')
//     })
// })
// below is the imported module which replaces the above function

db.connect( err  => {
    if (err) throw err;

    app.listen( 3008,  () => {
        console.log('API started with db')
    })
} );