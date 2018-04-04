var sshLog2JSON = require('./SshLog2JSON.js'),
    log2json = new sshLog2JSON();

log2json.async("./sshlogs.log",
function callback(jsonArray) {
    console.log(JSON.stringify(jsonArray[0]))
});
