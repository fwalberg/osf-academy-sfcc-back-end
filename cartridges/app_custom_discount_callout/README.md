## EXERCISE MODULE 5


## Use case: 
Modify the product tiles of all products with a sale price. Calculate the discount percentage between the standard price and the sale price and display it.


Result: [app_custom_discount_callout](https://zzrb-104.dx.commercecloud.salesforce.com/s/RefArch/search?q=ties&search-button=&lang=en_US).

## Implementation
### Controller

```javascript
'use strict'

var server = require('server');

server.extend(module.superModule);

server.append('Show', function(req, res, next) {
    var discountPercentage = null;
    var productHelper = require('*/cartridge/scripts/helpers/discountProductHelpers');
    var product = res.getViewData().product;
    var hasRequiredFields = productHelper.hasRequiredPrices(product)

    if (hasRequiredFields) {
        var standardPrice = product.price.list.value;
        var salePrice = product.price.sales.value;

        discountPercentage = productHelper.calculatePercentageOff(standardPrice, salePrice);

        res.setViewData({
            discountPercentage: discountPercentage 
        });
    }

    next();
});

module.exports = server.exports();
```

### Helper
```javascript
'use strict'

var productHelpers = require('*/cartridge/scripts/helpers/productHelpers')
/**
 * Calculates the discount percentage
 * @param {number} standardPrice - The normal price of the product
 * @param {number} salePrice - The on sale price of the product
 * @returns {number} - The discount percentage
 */
function calculatePercentageOff(standardPrice, salePrice) {
    return Math.round(((standardPrice - salePrice) / standardPrice) * 100);
}

/**
 * Checks if the product has the required prices
 * @param {dw.catalog.Product} product - The product to check
 * @returns {boolean} - True if the product has the required prices
 */
function hasRequiredPrices(product) {
    if(product.price.list != null && product.price.sales != null && product.price.list.value > product.price.sales.value) {
        return true;
    }
    
    return false;
}
```
### Templates
path: app_custom_discount_callout/cartridge/templates/default/product/components/pricing

#### discountOnSale.isml
```html
<div class="discount-percentage">
    ${Resource.msgf('best.deal.label', 'productTile', null, pdict.discountPercentage)}
</div>
```

#### main.isml
```
<isif condition="${price.type === 'tiered'}">
    <div class="price">
        <isinclude template="/product/components/pricing/tiered" />
    </div>
<iselseif condition="${price.type === 'range'}">
    <div class="price">
        <isinclude template="/product/components/pricing/range" />
    </div>
<iselse>
    <div class="price">
        <isset name="isLowPrice" value="${}" scope="page" />
        <isinclude template="/product/components/pricing/default" />
    </div>
</isif>

<isif condition="${!empty(pdict.discountPercentage)}">
    <isinclude template="/product/components/pricing/discountOnSale" />
</isif>
```

### .properties
```properties
best.deal.label=Best Deal: {0}% off
```

## Contributing

Pull requests are welcome.