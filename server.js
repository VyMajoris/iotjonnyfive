var express = require('express');
var app = express();



app.get('/hello', function(req, res){
    res.send('Hello world')
})
        
var server = app.listen(5000);
console.log('servidor na porta 5000')