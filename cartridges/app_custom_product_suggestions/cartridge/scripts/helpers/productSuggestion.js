'use strict';

var productHelper = require('*/cartridge/scripts/helpers/productHelpers');

/**
 * Retrieves product suggestions based on the category of the provided product.
 *
 * This function uses the `ProductSearchModel` to search for products in the same
 * category as the provided product, excluding the product itself from the list
 * of suggestions. It returns a maximum of four suggested products.
 *
 * @param {Object} product - The product object for which suggestions are generated.
 * @param {boolean} product.variant - Indicates if the product is a variant.
 * @param {Object} product.variationModel - The variation model of the product, if applicable.
 * @param {Object} product.variationModel.defaultVariant - The default variant of the product.
 * @param {Object} product.variationModel.defaultVariant.masterProduct - The master product of the variant.
 * @param {Object} product.variationModel.defaultVariant.masterProduct.primaryCategory - The primary category of the master product.
 * @param {string} product.variationModel.defaultVariant.masterProduct.primaryCategory.ID - The ID of the primary category of the master product.
 * @param {Object} product.primaryCategory - The primary category of the product.
 * @param {string} product.primaryCategory.ID - The ID of the primary category of the product.
 * @returns {Array} A list of suggested products, with a maximum of four products.
 */
function getProductSuggestions(product) {
    const ProductSearchModel = require('dw/catalog/ProductSearchModel');

    const productCategory = product.variant ? product.variationModel.defaultVariant
        .masterProduct.primaryCategory.ID : product.primaryCategory.ID;

    const productSearchModel = new ProductSearchModel();
    productSearchModel.setCategoryID(productCategory);
    productSearchModel.search();

    const maxProductHits = 4;
    const suggestedProducts = productSearchModel
        .getProductSearchHits()
        .asList().toArray()
        .filter(hit => hit.getProduct().ID != product.ID)
        .slice(0, maxProductHits)
        .map(hit => hit.getProduct());

    return suggestedProducts;
}

module.exports = {
    getProductSuggestions: getProductSuggestions
};