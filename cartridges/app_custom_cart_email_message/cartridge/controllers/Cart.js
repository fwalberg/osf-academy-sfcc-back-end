'use strict';

const server = require('server');
server.extend(module.superModule);

server.append('AddProduct', (req, res, next) => {

    const addedAnProduct = "product added to cart";

    res.setViewData({
        addedAnProduct: addedAnProduct
    });

    next();
});

module.exports = server.exports();