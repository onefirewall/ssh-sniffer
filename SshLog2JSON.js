REGULAR_EXP_IPV4 = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/;
TIME = /^--([A-Za-z]{3}) ([0-9]{2}) ([0-9]{2}):([0-9]{2}):([0-9]{2}) ([A-Za-z0-9\-\ ]+): ([0-9\.\[\]\ ]+) ([A-Za-z0-9\(\)\.\ \-\:]+)--$/;

var SshLog2JSON = function () {
    var fs = require('fs'),
        readline = require('readline'),
        outstream = new (require('stream'))();

    this.async = function (filename, callback) {
        var instream = fs.createReadStream(filename),
             rl = readline.createInterface(instream, outstream),
             jsonArray = [];

        rl.on('line', function (line) {
             line = line.trim();
             var fsWrite = require('fs');
             console.log('line'+line);
             lineRx = line.match(REGULAR_EXP_IPV4);
             console.log(lineRx);
             if (lineRx) {
                 var section_number = lineRx[1],
                     section_id = lineRx[2];
                 jsonArray.push(section_number);
                 jsonArray.push(section_id);
             }
        });

        rl.on('close', function (line) {
            callback(jsonArray)
        });
    }
};         
module.exports = SshLog2JSON;
