'use strict'

var server = require('server');

server.extend(module.superModule);

server.append('Show', function(req, res, next) {
    var discountPercentage = null;
    var productHelper = require('*/cartridge/scripts/helpers/discountProductHelpers');
    var product = res.getViewData().product;
    var hasRequiredFields = productHelper.hasRequiredPrices(product)

    if (hasRequiredFields) {
        var standardPrice = product.price.list.value;
        var salePrice = product.price.sales.value;

        discountPercentage = productHelper.calculatePercentageOff(standardPrice, salePrice);

        res.setViewData({
            discountPercentage: discountPercentage 
        });
    }

    next();
});

module.exports = server.exports();