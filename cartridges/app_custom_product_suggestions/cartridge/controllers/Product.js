'use strict';

const server = require('server');
server.extend(module.superModule);

const productMgr = require('dw/catalog/ProductMgr');
const productCategory = require('dw/catalog/Category');
const productSearchModel = require('dw/catalog/ProductSearchModel');



server.append('Show', function (req, res, next) {
    const productId = req.querystring.pid;
    const myProduct = productMgr.getProduct(productId);

    let viewData = res.getViewData();

    viewData.productId = productId;

    res.setViewData(viewData);

    res.json({
        productId: productId,
    });

    


   
    // const productSuggestions = productSearchModel.search('customSuggestions', {
    //     categoryID: targetProduct.primaryCategory.ID,
    //     searchPhrase: targetProduct.name,
    //     max: 4
    // });
    
    // const productSuggestionsList = [];
    // let productSuggestionsIterator = productSuggestions.productSearchHits.iterator();
    // while (productSuggestionsIterator.hasNext()) {
    //     let productSuggestionsHit = productSuggestionsIterator.next();
    //     let productSuggestionsProduct = productSuggestionsHit.product;
    //     productSuggestionsList.push(productSuggestionsProduct);
    // }

    // res.json({
    //     productId: productId,
    // });

    next();
});

module.exports = server.exports();