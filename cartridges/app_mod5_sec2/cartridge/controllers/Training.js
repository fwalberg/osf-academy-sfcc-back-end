'use strict'

var server = require('server');

server.get('HelloWorld', function (req, res, next) {
    var myVariable = "Hello, it's my first controller: METHOD GET";

    res.render('training/myfirsttemplate', {
        myVariable: myVariable
    });

    return next();
});

module.exports = server.exports();
