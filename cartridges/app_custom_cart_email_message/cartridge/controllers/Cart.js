'use strict';

const server = require('server');
server.extend(module.superModule);

server.append('AddProduct', (req, res, next) => {

    const BasketMgr = require('dw/order/BasketMgr');
    const URLUtils = require('dw/web/URLUtils');
    const emailService = require('*/cartridge/scripts/helpers/cartEmailService');

    const currentBasket = BasketMgr.getCurrentBasket();
    const customer = req.currentCustomer.raw;

    const customerEmail = customer.getProfile().getEmail();
    const productLineItems = currentBasket.getProductLineItems();
    const lastAddedProduct = productLineItems[productLineItems.length - 1];

    if (lastAddedProduct) {
        const productName = lastAddedProduct.getProductName();
        const productImage = lastAddedProduct.getProduct().getImage('medium').getAbsURL().toString();
        const productUrl = URLUtils.https('Product-Show', 'pid', lastAddedProduct.getProductID()).toString();
        const productDescription = lastAddedProduct.getProduct().getShortDescription();
        const productPrice = lastAddedProduct.getPrice().getValue();
        const productQuantity = lastAddedProduct.getQuantityValue();

        emailService.sendProductAddedEmail(customerEmail, {
            image: productImage,
            productUrl: productUrl,
            name: productName,
            description: productDescription,
            price: productPrice,
            quantity: productQuantity
        });
    }

    next();
});

module.exports = server.exports();