REGULAR_EXP_IPV4 = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/;
TIME_STAMP_EXP = /([A-Za-z]{3}) ([0-9]{2}) ([0-9]{2}):([0-9]{2}):([0-9]{2})/gi;


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
             lineIp = line.match(REGULAR_EXP_IPV4);

             if (lineIp) {
                 var lineTimeStamp = line.match(TIME_STAMP_EXP),
                     record = {};
                 record.ip = lineIp;
                 record.date = lineTimeStamp;
                 record.typeInfo = null;
                 jsonArray.push(record);
             }
        });

        rl.on('close', function (line) {
            callback(jsonArray)
        });
    }
};         
module.exports = SshLog2JSON;
