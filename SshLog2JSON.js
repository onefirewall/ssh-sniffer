REGULAR_EXP_IPV4 = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/;
TIME_STAMP_EXP = /([A-Za-z]{3}) ([0-9]{2}) ([0-9]{2}):([0-9]{2}):([0-9]{2})/gi;

var SshLog2JSON = function () {
    var _ = require('underscore'),
        fs = require('fs'),
        readline = require('readline'),
        outstream = new (require('stream'))(),
        record = {};

    this.async = function (filename, callback) {
        var instream = fs.createReadStream(filename),
            rl = readline.createInterface(instream, outstream),
            jsonArray = [];

        rl.on('line', function (line) {
             line = line.trim();
             var fsWrite = require('fs'),
                 lineIp = line.match(REGULAR_EXP_IPV4),
                 listOfIp = [];

             if (lineIp) {
                 var lineTimeStamp = line.match(TIME_STAMP_EXP);
                 listOfIp.push(lineIp[0]);
                 _.map(listOfIp, function (item) {
                     if (!_.isEmpty(jsonArray[0])) {
                        _.map(jsonArray[0], function (obj) {
                            if (obj == item) {
                                 var arrayDate = record.listOfDate;
                                 arrayDate.push(lineTimeStamp);
                                 jsonArray[0].listOfDate = arrayDate;
                            }
                        });
                     } else {
                         record.ip = item;
                         record.listOfDate = lineTimeStamp;
                         record.index = lineIp.index;
                         record.typeInfo = lineIp.input;
                     }
                     jsonArray.push(record);
                 });
             }
        });

        rl.on('close', function (line) {
            callback(jsonArray);
        });
    }
};         
module.exports = SshLog2JSON;
