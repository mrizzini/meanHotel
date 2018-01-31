var filename = 'index.js'; // this isnt exposed but still can be accepted into the other functions

var hello = function(name) {
    console.log('Hello ' + name);
};

var intro = function() {
    console.log("I'm a node file called " + filename);
};

module.exports = { // exports hello and intro functions
    hello: hello,
    intro: intro
};