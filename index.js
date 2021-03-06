var http = require('http');
var fs = require('fs');
var extract = require('./extract');
//get this error but it isnt used.
//just followed the book
var wss = require('./websockets-server');
var mime = require('mime');

var handleError = function(err, res) {
  res.writeHead(404);
  res.end();
};

var server = http.createServer(function(req, res) {
  console.log('Responding to a request');
  var filePath = extract(req.url);
  fs.readFile(filePath, function(err, data) {
    if (err) {
      handleError(err, res);
      return;
    } else {
      var fileType = mime.lookup(filePath);
      res.setHeader('content-type', fileType);
      res.end(data);
    }
  });
});
server.listen(3000);
