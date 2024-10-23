'use strict';

const server = require('server');
server.extend(module.superModule);

server.append('AddProduct', (req, res, next) => {

    const BasketMgr = require('dw/order/BasketMgr');
    const URLUtils = require('dw/web/URLUtils');
    const currentBasket = BasketMgr.getCurrentBasket();
    const customer = req.currentCustomer.raw;

    let customerEmail = customer.getProfile().getEmail();

    const productLineItems = currentBasket.getProductLineItems();
    const lastAddedProduct = productLineItems[productLineItems.length - 1];

    if (lastAddedProduct) {
        const productName = lastAddedProduct.getProductName();
        const productImage = lastAddedProduct.getProduct().getImage('medium').getAbsURL().toString();
        const productUrl = URLUtils.https('Product-Show', 'pid', lastAddedProduct.getProductID()).toString();
        const productDescription = lastAddedProduct.getProduct().getShortDescription();
        const productPrice = lastAddedProduct.getPrice().getValue();
        const productQuantity = lastAddedProduct.getQuantityValue();

        sendProductAddedEmail(customerEmail, {
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

function sendProductAddedEmail(toEmail, productData) {
    const Mail = require('dw/net/Mail');
    const Site = require('dw/system/Site');
    const Template = require('dw/util/Template');
    const HashMap = require('dw/util/HashMap');

    const mail = new Mail();
    mail.addTo(toEmail);
    mail.setFrom(Site.current.getCustomPreferenceValue('customerServiceEmail') || 'noreply@salesforce.com');
    mail.setSubject('Confirmation for Your Order');

    const context = new HashMap();
    context.put('Product', productData);

    const template = new Template('cartEmailNotification.isml');
    const emailContent = template.render(context);

    mail.setContent(emailContent);

    try {
        mail.send();
    } catch (e) {
        require('dw/system/Logger').error('Erro ao enviar e-mail: ' + e.message);
    }
}

module.exports = server.exports();