let express = require('express');
let cors = require('cors');

let app = express();
const port = 3000;



app.use(cors());


// 1 - Calculate total price of items in the cart
function calculateCartTotal(newItemPrice, cartTotal) {
  const totalCartPrice = newItemPrice + cartTotal;
  return totalCartPrice.toString();
}

// 1 - endpoint Calculate total price of items in the cart
app.get('/cart-total', (req, res) => {
  const newItemPrice = parseFloat(req.query.newItemPrice);
  const cartTotal = parseFloat(req.query.cartTotal);
  res.send(calculateCartTotal(newItemPrice, cartTotal));
});

// 2 -Membership Discount
function applyMembershipDiscount(cartTotal, isMember) {
  let finalPrice = cartTotal;
  if (isMember === 'true') {
    let discount = (cartTotal * discountPercentage) / 100;
    finalPrice = cartTotal - discount;
  }
  return finalPrice;
}

// 2 - endpoint Membership Discount
app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember;

  res.send(applyMembershipDiscount(cartTotal, isMember).toString());
});

// 3 - Calculate Tax
function calculateTax(cartTotal) {
  let taxAmount = (cartTotal * taxRate) / 100;
  return taxAmount;
}

// 3 - endpoint Calculate Tax
app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);

  res.send(calculateTax(cartTotal).toString());
});

// 4 - Estimate Delivery Time
function estimateDelivery(shippingMethod, distance) {
  let deliveryDays;

  if (shippingMethod === 'standard') {
    deliveryDays = distance / 50;
  } else if (shippingMethod === 'express') {
    deliveryDays = distance / 100;
  }

  return Math.ceil(deliveryDays);
}

// 4 - endpoint Estimate Delivery Time
app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);

  res.send(estimateDelivery(shippingMethod, distance).toString());
});

// 5 - Calculate Shipping Cost
function calculateShippingCost(weight, distance) {
  return weight * distance * 0.1;
}

// 5 - endpoint Calculate Shipping Cost

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);

  res.send(calculateShippingCost(weight, distance).toString());
});

// 6 - Calculate Loyalty Points
function calculateLoyaltyPoints(purchaseAmount) {
  return purchaseAmount * loyaltyRate;
}

// 6 - endpoint
app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);

  res.send(calculateLoyaltyPoints(purchaseAmount).toString());
});

// Server - Side values
let taxRate = 5; // 5%
let discountPercentage = 10; // 10%
let loyaltyRate = 2; //2 points per 1$

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
