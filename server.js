let express = require('express');
let bodyParser = require('body-parser');

let app = express();

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

app.get('/cities/:id', function (req, res){
    try{
        let city = cities.find( el => el.id === Number( req.params.id ) );
        res.send(city.name ? city : '<button style="color: white; background-color: seagreen">empty</button>')
    }catch{
        res.send('<button style="color: white; background-color: indianred">the end object</button>')
    }
})

app.post('/cities', function (req, res){
    let out = {
        id: cities.slice(-1)[0].id + 1,     //id: cities[cities.length-1].id + 1
        name: req.body.name
    }
    cities.push(out)
    console.log(req.body)
    res.send(out);
})

app.listen(3008, function (){
    console.log('API started')
})