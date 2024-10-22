'use strict';

const server = require('server');
server.extend(module.superModule);

server.append('AddProduct', (req, res, next) => {

    const BasketMgr = require('dw/order/BasketMgr');
    const currentBasket = BasketMgr.getCurrentBasket();
    const customer = req.currentCustomer.raw;

    const customerEmail = customer.getProfile().getEmail();

    const productLineItems = currentBasket.getProductLineItems();
    const lastAddedProduct = productLineItems[productLineItems.length - 1];

    if (lastAddedProduct) {
        const productId = lastAddedProduct.getProductID();
        const productName = lastAddedProduct.getProductName();
        const productImage = lastAddedProduct.getProduct().getImage('large').getURL();
        const productDescription = lastAddedProduct.getProduct().getShortDescription();
        const productPrice = lastAddedProduct.getPrice().getValue();
        const productQuantity = lastAddedProduct.getQuantityValue();

        // Enviar e-mail com as informações do produto
        sendProductAddedEmail(customerEmail, {
            image: productImage,
            name: productName,
            description: productDescription,
            price: productPrice,
            quantity: productQuantity
        });

        res.setViewData({
            customerEmail: customerEmail,
            lastAddedProductId: productId,
            lastAddedProductName: productName
        });

    } else {
        res.setViewData({
            customerEmail: customerEmail,
            message: 'Nenhum produto foi adicionado recentemente.'
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
    mail.setFrom(Site.current.getCustomPreferenceValue('customerServiceEmail') || 'no-reply@example.com');
    mail.setSubject('Produto Adicionado ao Carrinho');

    // Renderizar o template ISML
    const context = new HashMap();
    context.put('Product', productData);

    const template = new Template('cartridges/app_custom_cart_email_message/cartridge/templates/default/cartEmailNotification.isml');
    const emailContent = template.render(context).text;

    mail.setContent(emailContent, 'text/html', 'UTF-8');

    try {
        mail.send();
        // Log ou outra ação em caso de sucesso
    } catch (e) {
        // Log ou outra ação em caso de erro
        require('dw/system/Logger').error('Erro ao enviar e-mail: ' + e.message);
    }
}

module.exports = server.exports();