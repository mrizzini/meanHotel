// how to read a file async
var fs = require('fs') // brings in native node module, fs. we can now use readFileSync to read in a file from file system

var onFileLoad = function(err, file) { // asigns this to a function so we dont have to use an annonymous call back
    console.log("Got the file"); 
};

console.log('Going to get a file');

fs.readFile('readFileSync.js', onFileLoad);
 // reads the file

// fs.readFile('readFileSync.js', function(err, file) { // uses annonymous function
//     console.log('Got the file');
// }); // reads the file

console.log('App continues...');