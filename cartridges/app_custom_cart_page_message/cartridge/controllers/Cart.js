const server = require('server');
const Cart = module.superModule;

server.extend(Cart);

server.append('Show', (req, res, next) => {
    const BasketMgr = require('dw/order/BasketMgr');
    const currentBasket = BasketMgr.getCurrentBasket();
    const carTotal = currentBasket.totalGrossPrice.value;


    res.setViewData({
        customMessage: "Custom message test!!!",
        carTotal: carTotal
    });

    next();
});