#! /usr/bin/env node

var os = require('os');
var sys = require('sys')
var exec = require('child_process').exec;
var conf = require(__dirname+'/config.json')
var pkg = require(__dirname+'/package.json');
var Reportr = require('reportr-api');

conf.event = conf.event === ""||conf.event===undefined?"machine.battery.state":conf.event;

if (!conf.host) {
    console.log("Need 'host'");
    return process.exit(-1);
}

console.log("Configure with host: ", conf.host);
var client = new Reportr({
    host: conf.host,
    auth: (conf.username? { 'username': conf.username, 'password': conf.password } : null)
});

exec(__dirname+"/battest.sh", function(error, stdout, stderr){
    // console.log(stdout.split('    | |           '));
    var properties = {};
    var lines = stdout.split('    | |           "').join('');
    lines = lines.split('\n');
    lines.pop();
    for(line in lines){
        var l = lines[line].split('" = ');

        if(l[0]==='LegacyBatteryInfo'){
            var lbi={};
            l[1]=l[1].replace("{\"","");
            l[1]=l[1].replace("}","");
            l[1]=l[1].split(",\"");
            for(el in l[1]){
                var x = l[1][el].split("\"=");
                lbi[x[0]]=parseInt(x[1]);
            }
            properties[l[0]]=lbi;
        }
        else {
            properties[l[0]]=parseInt(l[1]);
        }
    }
    client.postEvent(conf.event, properties)
    .then(function() {
        console.log("posted: "+JSON.stringify(properties));
    }, function(e) {
        console.log("failed:", e.message || e);
    });
});
