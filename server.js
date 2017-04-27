var express = require('express'),
    app = express(),
    path = require('path'),
    host = process.env.OPENSHIFT_NODEJS_IP || "0.0.0.0",
    port = process.env.OPENSHIFT_NODEJS_PORT || 1337;

app.use("/bower_components", express.static(path.join(__dirname, "bower_components")));
app.use("/www", express.static(path.join(__dirname, "www/")));

app.get('/*/*.html', function(req, res) {
  console.log('originalUrl: ' + req.originalUrl);
  var file = path.join(__dirname, 'www', req.originalUrl);
  console.log('/: ' + file);

  res.sendFile(file);
});

app.get('/*', function(req, res) {
  console.log('originalUrl: ' + req.originalUrl);
  var file = path.join(__dirname, 'www/index.html');
  console.log('/: ' + file);

  res.sendFile(file);
});


var server = app.listen(port, host, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Server running on %s:%s", host, port);
  console.log(__dirname);

});
