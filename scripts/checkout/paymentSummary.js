import {cart, clearCart} from '../../data/cart.js';
import {getProduct} from '../../data/products.js';
import {getDeliveryOption} from '../../data/deliveryOptions.js';
import {formatCurrency} from '../utils/money.js';
import {addOrder} from '../../data/orders.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;
  let totalQuantity = 0;

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    if (!product) {
      return; // skip this cart item
    }
    productPriceCents += product.priceCents * cartItem.quantity;
    totalQuantity += cartItem.quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;
  });

  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;

  const paymentSummaryHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${totalQuantity}):</div>
      <div class="payment-summary-money">
        ₹${formatCurrency(productPriceCents)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">
        ₹${formatCurrency(shippingPriceCents)}
      </div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">
        ₹${formatCurrency(totalBeforeTaxCents)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">
        ₹${formatCurrency(taxCents)}
      </div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">
        ₹${formatCurrency(totalCents)}
      </div>
    </div>

    <button class="place-order-button button-primary js-place-order-button">
      Place your order
    </button>
  `;

  const paymentSummaryElem = document.querySelector('.js-payment-summary');
  if (!paymentSummaryElem) {
    return;
  }
  try {
    paymentSummaryElem.innerHTML = paymentSummaryHTML;
  } catch (e) {
    paymentSummaryElem.innerHTML = '<div class="error">Failed to render payment summary. Please try again later.</div>';
    return;
  }

  // Add event listener to place order button
  const placeOrderBtn = document.querySelector('.js-place-order-button');
  if (!placeOrderBtn) {
    paymentSummaryElem.innerHTML += '<div class="error">Order button unavailable.</div>';
    return;
  }
  placeOrderBtn.addEventListener('click', () => {
      // Create a new order from cart items
      const orderItems = cart.map(cartItem => {
        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        return {
          productId: cartItem.productId,
          quantity: cartItem.quantity,
          deliveryDays: deliveryOption.deliveryDays
        };
      });
      
      // Only create order if cart has items
      if (orderItems.length > 0) {
        const newOrder = {
          id: generateOrderId(),
          orderDate: dayjs().toISOString(),
          items: orderItems
        };
        
        // Add order to orders list
        addOrder(newOrder);
        
        // Clear the cart
        clearCart();
        
        // Show confirmation and redirect to orders page
        alert('Order Confirmed!');
        window.location.href = 'orders.html';
      } else {
        alert('Your cart is empty!');
      }
    });
}

// Generate a random order ID
function generateOrderId() {
  // Create a random string that resembles a UUID
  const timestamp = new Date().getTime();
  const randomPart = Math.random().toString(36).substring(2, 10);
  return `order-${timestamp}-${randomPart}`;
}