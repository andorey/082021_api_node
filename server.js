let express = require('express');

let app = express();

app.get('/', function(req, res){
    res.send('you on my API')
})

app.listen(3008, function (){
    console.log('API app started')
})