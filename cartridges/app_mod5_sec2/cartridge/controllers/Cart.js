'use strict';

var server = require('server');

server.extend(module.superModule);

server.append('Show', function(req, res, next) {
    var viewData = res.getViewData();
    viewData.example = 'This text is appended to the view';

    res.setViewData(viewData);

    return next();
});

module.exports = server.exports();