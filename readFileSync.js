// this is how to read a file syncronsuly
var fs = require('fs') // brings in native node module, fs. we can now use readFileSync to read in a file from file system

console.log('Going to get a file');
var file = fs.readFileSync('readFileSync.js'); // reads the file
console.log('Got the file');

console.log('App continues...');