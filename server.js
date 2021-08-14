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

// app.get('/cities/:id', function (req, res){
//     for (let i of cities){
//         if (i.id === ~~req.params.id){
//             res.send(i.name)
//         }
//     }
// })

app.get('/cities/:id', function (req, res){
    let city = cities.find(function (el){
        return el.id === ~~req.params.id
    })
    res.send(city)
})

let txt = 'test page';

app.get('/test', function (req, res){
    res.send(txt)
})

app.post('/test', function (req, res){
    let out = {
        id: Date.now(),
        name: req.body.id
    }
    console.log(out);
    txt += out.id;
    res.send(out);
})

app.listen(3008, function (){
    console.log('API app started')
})