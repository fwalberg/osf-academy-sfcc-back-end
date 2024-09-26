'use strict'

/**
 * Calculates the discount percentage
 * @param {number} standardPrice - The normal price of the product
 * @param {number} salePrice - The on sale price of the product
 * @returns {number} - The discount percentage
 */
function calculatePercentageOff (standardPrice, salePrice) {
    return (standardPrice - salePrice) / standardPrice * 100;
}

/**
 * Checks if the product has the required prices
 * @param {dw.catalog.Product} product - The product to check
 * @returns {boolean} - True if the product has the required prices
 */
// function hasRequiredPrices(product) {
//     return product && product.price && product.price.list && product.price.sales;
// }

module.exports = {
    calculatePercentageOff:calculatePercentageOff
};