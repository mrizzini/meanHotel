var child_process = require('child_process'); // child process module brought in
// use child processes when you are dealing with computations

console.log(1);

var newProcess = child_process.spawn('node', ['_fibonacci.js'], {
    stdio: 'inherit' // ensures console log of child process will show in the command line of the main process
}); // spwan method needs comand (node), and the argument (the fibonacci file)

// require('./_fibonacci.js'); this line isnt needed anymore

console.log(2);