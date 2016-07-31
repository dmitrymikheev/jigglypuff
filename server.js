var fs = require('fs');
var path = require('path');
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 1337));

app.use('/public', express.static(path.join(__dirname, 'app/dist')));

app.get('/*', function(req, res){
  res.sendFile(__dirname + '/app/dist/index.html');
});

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
