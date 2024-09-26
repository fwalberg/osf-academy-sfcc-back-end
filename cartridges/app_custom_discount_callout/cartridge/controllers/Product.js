'use strict'

var server = require('server');
var discountPercentage = 'discount variable';

server.append('Show', function(req, res, next) {
    var productHelper = require('*/cartridge/scripts/helpers/productHelpers');
    var product = res.getViewData().product;

    discountPercentage = JSON.stringify(product);

    // var standardPrice = product.price.list.value;
    // var salePrice = product.price.sales.value;

    // // if (false) {
    // //     discountPercentage = productHelper.calculateDiscountPercentage(standardPrice, salePrice);

    res.setViewData({
        discountPercentage:discountPercentage 
    });
    // // }


    next();
});

module.exports = server.exports();