const server = require('server');
server.extend(module.superModule);

server.append('Show', (req, res, next) => {

    const BasketMgr = require('dw/order/BasketMgr');
    const Site = require('dw/system/Site');

    const currentBasket : Basket = BasketMgr.getCurrentBasket();

    if (!currentBasket) {
        return next();
    }

    if (currentBasket.productLineItems.length === 0) {
        return next();
    }

    const carTotal = currentBasket.totalGrossPrice.value;
    const cartThreshold = Site.getCurrent().getCustomPreferenceValue('cartTotalThreshold');
    const isThresholdExceeded = carTotal >= cartThreshold;

    let viewData = res.getViewData();
    if (isThresholdExceeded) {
        const cartMessage = Site.getCurrent()
            .getCustomPreferenceValue('cartTotalThresholdMessage')
            .concat(cartThreshold);

        viewData.cartMessage = cartMessage;
        viewData.isThresholdExceeded = isThresholdExceeded;
    }

    res.setViewData(viewData);

    next();
});

module.exports = server.exports();