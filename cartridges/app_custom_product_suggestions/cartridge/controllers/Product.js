'use strict';

const server = require('server');
server.extend(module.superModule);

server.append('Show', (req, res, next) => {
    const ProductMgr = require('dw/catalog/ProductMgr')
    const productHelper = require('*/cartridge/scripts/helpers/productSuggestion.js');

    const product = ProductMgr.getProduct(req.querystring.pid);
    const suggestedProducts = product ? productHelper.getProductSuggestions(product) : [];

    res.setViewData({
        suggestedProducts: suggestedProducts,
    });

    next();
});

module.exports = server.exports();