/**
 * Created by cynic
 */

var climb = require('./climb');


var args = {energy: 100};

climb.on('done', function () {
    console.log('Successfully climbed');
});

climb.on('pre', function (name) {
    console.log('Before climbing ' + name);
});

climb.run(args);





