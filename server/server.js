var express = require('express');
var five = require('johnny-five');
var requests = require('request');
var iot = "https://roboq-7e9fe.firebaseio.com/iot/temp.json";

var app = express();
var board = new five.Board({"port":"COM3"});

var led;



function putTo(message, url) {
	var options = {
		uri: url,
		method: 'PUT',
		json: message
	};
	
	requests(options, function (error, response) {
		if (!error && response.statusCode == 200) {
			console.log("OK!"); // Print the shortened url.
		} else {
			console.log("ERRoR"); // Print the shortened url.
            putTo({state: "begin"}, iot);
		}
	});
}


board.on('ready', function(){
    console.log('Arduino Conectado');
    //led = new five.Led(11);
    var temperature = new five.Thermometer({
        controller: "LM35",
        pin: "A0"
    });
    
    temperature.on("change", function() {
       
        putTo({'temperatura':this.celsius},iot)
       
    });
});




app.all('/*', function(req,res,next){
   
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers',
                    'Content-Type,Accept,X-Access-Token,X-Key,x-requested-with');
    
    if(req.method == 'OPTIONS'){
        res.status(200).end();
    }else{
        next();
    }
    
});

app.get('/hello', function(req,res){
    res.send('Hello IoT');
});

app.get('/led/ligar', function(req,res){
    led.fadeIn(10000);    
    //led.on();
    res.send('Led ligado');
});

app.get('/led/desligar', function(req,res){
    led.fadeOut(10000);
    //led.off();
    res.send('Led desligado');
});

var server = app.listen(3000);
console.log('Servidor na porta 3000');