var http = require('http');
var fs = require('fs');

var files = fs.readdirSync('../log_workout');
var text = ""
for (i=0; i<files.length; i++) {
  text += files[i] + "<br>";
}

function onRequest(request, response) {
  response.writeHead(200, {'Content-Type': 'text/html'});
  fs.readFile("../workout.html", null, function(error, data) {
    if (error) {
      response.writeHead(404);
      response.write("File not found!");
    }
    else {
      response.write(text);
    }
    response.end();
  })
}

http.createServer(onRequest).listen(8080);
