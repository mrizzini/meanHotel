require('./instantHello');    // loads in other scripts to use. looks in same directory you are in. don't use .js

var goodbye = require('./talk/goodbye'); // assigns goodbye file to a variable so we can access it
var talk = require('./talk') // will look for a file called talk.js, then will look for a file caled index.js
var question = require('./talk/question');

talk.intro();
talk.hello("Matt"); // pushes a variable into the method

var answer = question.ask('What is the meaning of life?');
console.log(answer);

goodbye(); // calls the function 