const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

let cities = [
    {
        id:1,
        name: 'London'
    },
    {
        id:2,
        name: 'Warsaw'
    },
    {
        id:3,
        name:'Philadelphia'
    },
    {
        id:4,
        name:'Hamilton'
    }
]

app.get('/', function(req, res){
    res.send('you on my API')
})

app.get('/cities', function (req, res){
    res.send(cities)
})

app.get('/cities/:id', function (req, res){     // replaced empty url with buttons
    try{
        const city = cities.find( el => el.id === Number( req.params.id ) );
        res.send(city.name ? city : '<button style="color: white; background-color: seagreen">empty</button>')
    }catch{
        res.send('<button style="color: white; background-color: indianred">the end object</button>')
    }
})

app.post('/cities', function (req, res){
    const city = {
        id: cities.slice(-1)[0].id + 1,             //id: cities[cities.length-1].id + 1
        name: req.body.name
    }
    cities.push(city)
    console.log(req.body)
    res.send(city);
})

app.put('/cities/:id', function (req, res){         // replace element's name
    const city = cities.find(el => el.id === Number(req.params.id))
    city.name = req.body.name;
    res.sendStatus(200)
})

app.delete('/cities/:id', function (req, res){      // remove item from list
    cities = cities.filter(el => el.id !== Number(req.params.id))
    res.sendStatus(200)
})

app.listen(3008, function (){
    console.log('API started')
})