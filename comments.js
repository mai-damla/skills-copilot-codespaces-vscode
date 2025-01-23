\\ Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var port = 3000;

var server = http.createServer(function(req, res) {
  var urlParsed = url.parse(req.url, true);
  console.log(urlParsed);

  if (urlParsed.pathname == '/index' || urlParsed.pathname == '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(fs.readFileSync('index.html'));
  }
  else if (urlParsed.pathname == '/form') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(fs.readFileSync('form.html'));
  }
  else if (urlParsed.pathname == '/comments') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(fs.readFileSync('comments.html'));
  }
  else if (urlParsed.pathname == '/comment') {
    var comments = JSON.parse(fs.readFileSync('comments.json'));
    comments.push(urlParsed.query);
    fs.writeFileSync('comments.json', JSON.stringify(comments));
    res.end('Comment added');
  }
  else {
    res.end('404');
  }
});

server.listen(port, '