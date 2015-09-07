var Express = require('express'); // express object
var morgan = require('morgan'); // logs every request to terminal
var bodyParser = require('body-parser'); // helps parsing the request body
var app = Express(); // our app
var fs = require('fs');
var pathUtils = require('path');

function NodeDrive() {}

NodeDrive.prototype.initialize = function() {
    app.use(morgan('dev'));

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(bodyParser.json());

    app.get('/', function(req, res) {
        var html = pathUtils.join(__dirname, '../html', 'index.html');
        res.sendFile(html);
    });

    app.get('/files', function(req, res) {
        currentManifestItems(function(err, data) {
            if (err) {
                console.log("Error: " + err);
                res.send({error:err});
            } else {
                res.send(data);
            }
        });
    });
};

NodeDrive.prototype.start = function() {
    app.listen(3000, function() {
        console.log("Listening on port " + 3000);
    });
};

function currentManifestItems(callback) {
    fs.readFile('/tmp/manideb.json', 'utf8', function (err, data) {
        if (err) {
            callback(err, undefined);
        } else {
            callback(undefined, JSON.parse(data));
        }
    });
}

module.exports = NodeDrive;