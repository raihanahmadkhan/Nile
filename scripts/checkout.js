import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import {loadFromStorage, cart} from '../data/cart.js';

// Ensure cart data is loaded before rendering
loadFromStorage();

function updateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  const cartQuantityElem = document.querySelector('.js-cart-quantity');
  if (cartQuantityElem) {
    cartQuantityElem.innerHTML = cartQuantity;
  }
}

// Render order summary and payment summary
document.addEventListener('DOMContentLoaded', () => {
  updateCartQuantity();
  updateCartQuantity();
  try {
    console.log('Rendering order summary...');
    renderOrderSummary();
    
    console.log('Rendering payment summary...');
    renderPaymentSummary();
    
    // Verify that payment summary was rendered
    const paymentSummary = document.querySelector('.js-payment-summary');
    if (paymentSummary && paymentSummary.innerHTML.trim() === '') {
      console.error('Payment summary container is empty after rendering');
      // Try rendering again
      setTimeout(() => renderPaymentSummary(), 100);
    }
  } catch (error) {
    console.error('Error rendering checkout page:', error);
  }
});