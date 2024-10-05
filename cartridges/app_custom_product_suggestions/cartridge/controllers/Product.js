'use strict';

const server = require('server');
server.extend(module.superModule);

server.append('Show', (req, res, next) => {
    const ProductSearchModel = require('dw/catalog/ProductSearchModel');
    const ProductMgr = require('dw/catalog/ProductMgr')
    const CatalogMrg = require('dw/catalog/CatalogMgr')

    const product = ProductMgr.getProduct(res.viewData.product.id);
    const productCategory = product.primaryCategory.ID;

    const productSearchModel = new ProductSearchModel();
    productSearchModel.setCategoryID(productCategory);
    productSearchModel.search();
    
    const maxProductIDs = 4;
    const suggestedProducts = productSearchModel.getProductSearchHits().asList().toArray().slice(0, maxProductIDs);

    res.json({
        productTarget: product.name,
        category: productCategory,
        suggestedProductsIDs: suggestedProducts.toString()
    });

    next();
});

module.exports = server.exports();