const express = require('express');
const bodyParser = require('body-parser');
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

app.delete('/cities/:id', citiesController.delete)

db.connect( err  => {
    if (err) throw err;

    app.listen( 3008,  () => {
        console.log('API started with db')
    })
} );