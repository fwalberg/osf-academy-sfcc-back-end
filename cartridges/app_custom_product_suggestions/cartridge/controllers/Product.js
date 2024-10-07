'use strict';

const server = require('server');
server.extend(module.superModule);

server.append('Show', (req, res, next) => {
    const ProductSearchModel = require('dw/catalog/ProductSearchModel');
    const ProductMgr = require('dw/catalog/ProductMgr')
    const CatalogMrg = require('dw/catalog/CatalogMgr')

    const product = ProductMgr.getProduct(req.querystring.pid);
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
    
    res.setViewData({
        suggestedProducts: suggestedProducts.toString(),
    });

    next();
});

module.exports = server.exports();