var http = require('http'),
    server = http.createServer(handler),
    fs = require('fs'),
    path = require('path'),
    host = '127.0.0.1',
    port = normalizePort(process.env.PORT || '3000');

var mimes = {
    ".html" : "text/html",
    ".css" : "text/css",
    ".js" : "text/javascript",
    "gif" : "image/gif",
    ".jpg" : "image/jpeg",
    ".png" : "image/png"
};

server.listen(port);


function handler(req, res) {
    var filepath = (req.url === '/') ? ('./index.html') : ('.' + req.url);
    var contentType = mimes[path.extname(filepath)];
    //Check to see if the file exists
    fs.exists(filepath, function(file_exists) {
        if(file_exists) {
            res.writeHead(200, {'Content-Type' : contentType});
            var streamFile = fs.createReadStream(filepath).pipe(res);

            streamFile.on('error', function(){
                res.writeHead(500);
                res.end();
            })
        } else {
            res.writeHead(404);
            res.end("Sorry we could not find the file you asked for");
        }
    })
}

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}