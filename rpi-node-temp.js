#!/usr/bin/node

var exec = require('child_process').exec;

var tempId = '28-00000249bf39',
    dispTempInterval,
    dispTempIntervalClock = 10; //sec

var colors = {
  'red' : '\u001b[31m',
  'green' : '\u001b[32m',
  'yellow' : '\u001b[33m',
  'blue' : '\u001b[34m',
  'reset' : '\u001b[0m'
};

var log = function( msg ){
    var now = new Date();
    
    console.log( now.toUTCString() + " " + msg + colors.reset );
}

var dispTemp = function(){
    exec( "cat /sys/bus/w1/devices/" + tempId + "/w1_slave | grep t= | cut -f2 -d= | awk '{print $1/1000}'", function( error, stdout, stderr ){
        if ( error != null ){
          log( colors.red + "Error: " + error);
        }
 
        var temp = parseFloat(stdout).toFixed(2),
            color = (temp > 30 ) ? colors.red : colors.green;
            
        log ( color + "Current temperature: " + temp + "°C" );
    });
}

log( colors.blue + 'Started node-temp');
log( colors.blue + '-----------------');

/* Start interval */
dispTempInterval = setInterval( function(){
  dispTemp();
}, dispTempIntervalClock*1000 );
