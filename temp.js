// gScale Music App by Akshat Chaturvedi

var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function(req, res){
	var q = url.parse(req.url, true);
	var filename = "./public" + q.pathname;
	if(filename == './public/'){
		filename = './public/home';
	}
	filename = filename + '.html';
	console.log(filename)
	fs.readFile(filename, function(err, data){
		if(err){
			res.writeHead(404, {'Content-Type' : 'text/html'});
			res.end('404 NOT FOUND');
		}
		res.writeHead(200, {'Content-Type' : 'text/html'})
		res.write(data);
		return res.end();
	})
}).listen(8080);