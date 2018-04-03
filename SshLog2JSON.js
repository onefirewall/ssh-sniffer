SEPARATOR = /^--([0-9a-f]+)-([A-Z])--$/;
REGULAR_EXP_IPV4 = /^--([0-9]{1,3}\.){3}[0-9]{1,3}(\/([0-9]|[1-2][0-9]|3[0-2]))--$/;
TIME = /^--([A-Za-z]{3}) ([0-9]{2}) ([0-9]{2}):([0-9]{2}):([0-9]{2}) ([A-Za-z0-9\-\ ]+): ([0-9\.\[\]\ ]+) ([A-Za-z0-9\(\)\.\ \-\:]+)--$/;

var SshLog2JSON = function () {
	var fs = require('fs')
	var readline = require('readline')
	var outstream = new (require('stream'))()

	this.async = function (filename, callback) {

			var instream = fs.createReadStream(filename)
			var rl = readline.createInterface(instream, outstream)

			var jsonArray = []
			var transaction = undefined
			var section = undefined

			rl.on('line', function (line) {
				line = line.trim();
				var fsWrite = require('fs');
				var lineRx = line.match(REGULAR_EXP_IPV4);
				if(lineRx) {
					var section_number = lineRx[1];
					var section_id = lineRx[2];
				}
			});
				
			rl.on('close', function (line) {
					callback(jsonArray)
			});
	}
 }
 module.exports = SshLog2JSON
