var express = require('express');
var app = express();
var path = require('path');

app.get('/', function(req, res) {
  
  var file = path.join(__dirname + '/index.html');
  console.log('/: ' + file);
  
  res.sendFile(file);
});

app.use(express.static(__dirname));

var server = app.listen(3000, function() {
  var host = server.address().address;  
  var port = server.address().port;
  
  console.log("Server running on %s:%s", host, port);
  console.log(__dirname);

});