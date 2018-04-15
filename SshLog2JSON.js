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
                 lineTimeStamp = line.match(TIME_STAMP_EXP);

             if (lineIp) {
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
    for (var key in jsonArray) {
        if (!_.isEmpty(validationJsonArray)) {
            for (var index in validationJsonArray) {
                if ((validationJsonArray[index].ip == jsonArray[key].ip) && !_.contains(validationJsonArray[index].listOfDate, jsonArray[key].ip)) {
                    validationJsonArray[index].listOfDate.push(jsonArray[key].listOfDate[0]);
                } else {
                    validationJsonArray.push(jsonArray[key]);
                }
            }
        } else {
            validationJsonArray.push(jsonArray[key]);
        }
    }
    return validationJsonArray;
}

module.exports = SshLog2JSON;
