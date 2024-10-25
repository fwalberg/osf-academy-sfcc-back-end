'use strict';

/**
 * Sends an email notification to the specified recipient when a product is added.
 *
 * This function constructs and sends an email using the provided recipient's email address
 * and product data. It utilizes the Salesforce Commerce Cloud (SFCC) Mail service to send
 * the email. The email content is generated from a template and includes product details.
 *
 * @param {string} toEmail - The recipient's email address.
 * @param {Object} productData - An object containing details about the product to be included in the email.
 *
 * @throws Will log an error message if the email fails to send.
 */
function sendProductAddedEmail(toEmail, productData) {
    var Mail = require('dw/net/Mail');
    var Site = require('dw/system/Site');
    var Template = require('dw/util/Template');
    var HashMap = require('dw/util/HashMap');

    var mail = new Mail();
    mail.addTo(toEmail);
    mail.setFrom(Site.current.getCustomPreferenceValue('customerServiceEmail') || 'noreply@salesforce.com');
    mail.setSubject('Confirmation for Your Order');

    var context = new HashMap();
    context.put('Product', productData);

    var template = new Template('cartEmailNotification.isml');
    var emailContent = template.render(context);

    mail.setContent(emailContent);

    try {
        mail.send();
    } catch (e) {
        require('dw/system/Logger').error('Erro ao enviar e-mail: ' + e.message);
    }
}

module.exports = {
    sendProductAddedEmail: sendProductAddedEmail
};
