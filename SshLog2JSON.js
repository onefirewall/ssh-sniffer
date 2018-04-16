REGULAR_EXP_IPV4 = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/;
TIME_STAMP_EXP = /([A-Za-z]{3}) ([0-9]{2}) ([0-9]{2}):([0-9]{2}):([0-9]{2})/gi;
var _ = require('underscore');

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
             var fsWrite = require('fs'),
                 lineIp = line.match(REGULAR_EXP_IPV4);

             if (lineIp) {
                var lineTimeStamp = line.match(TIME_STAMP_EXP);
                jsonArray.push({
                    ip: lineIp[0],
                    listOfDate: lineTimeStamp,
                    typeInfo: lineIp.input
                });
             }
        });

        rl.on('close', function (line) {
            callback(validationJsonArray(jsonArray));
        });
    }
};

function validationJsonArray(jsonArray) {
    var validationJsonArray = [];
    _.map(jsonArray, function (item) {
        if (!_.isEmpty(validationJsonArray)) {
            _.map(validationJsonArray, function (data) {
                if ((data.ip == item.ip) && !_.contains(data.listOfDate, item.listOfDate[0])) {
                    data.listOfDate.push(item.listOfDate[0]);
                } else {
                    validationJsonArray.push(item);
                }
            });
        } else {
            validationJsonArray.push(item);
        }
    });
    return validationJsonArray;
}

module.exports = SshLog2JSON;
