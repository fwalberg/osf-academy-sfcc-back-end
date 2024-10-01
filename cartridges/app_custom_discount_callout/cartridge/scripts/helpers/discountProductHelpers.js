'use strict'

var productHelpers = require('*/cartridge/scripts/helpers/productHelpers')
/**
 * Calculates the discount percentage
 * @param {number} standardPrice - The normal price of the product
 * @param {number} salePrice - The on sale price of the product
 * @returns {number} - The discount percentage
 */
function calculatePercentageOff(standardPrice, salePrice) {
    return Math.round(((standardPrice - salePrice) / standardPrice) * 100);
}

/**
 * Checks if the product has the required prices
 * @param {dw.catalog.Product} product - The product to check
 * @returns {boolean} - True if the product has the required prices
 */
function hasRequiredPrices(product) {
    if(product.price.list != null && product.price.sales != null && product.price.list.value > product.price.sales.value) {
        return true;
    }
    
    return false;
}

module.exports = {
    calculatePercentageOff: calculatePercentageOff,
    hasRequiredPrices: hasRequiredPrices
};