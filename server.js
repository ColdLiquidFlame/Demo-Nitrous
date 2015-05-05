var express = require('express');
var app = express();
var path = require('path');
var host = process.env.OPENSHIFT_NODEJS_IP || "0.0.0.0";
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.use(express.static(__dirname));

app.get('/', function(req, res) {
  
  var file = path.join(__dirname + '/index.html');
  console.log('/: ' + file);
  
  res.sendFile(file);
});


var server = app.listen(port, host, function() {
  var host = server.address().address;  
  var port = server.address().port;
  
  console.log("Server running on %s:%s", host, port);
  console.log(__dirname);

});