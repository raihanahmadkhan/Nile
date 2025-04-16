import { orders } from '../data/orders.js';
import { products, getProduct } from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import { addToCart } from '../data/cart.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

function renderOrders() {
  const ordersGrid = document.querySelector('.orders-grid');
  
  // Clear existing orders display
  ordersGrid.innerHTML = '';
  
  // Only show a message if there are no orders; do NOT add sample orders again
  if (orders.length === 0) {
    ordersGrid.innerHTML = '<div class="no-orders-message">You have no orders yet.</div>';
    return;
  } else {
    // Render each order
    orders.forEach(order => {
      // Use the order date if available, otherwise use current date
      const orderDate = order.orderDate ? dayjs(order.orderDate) : dayjs();
      const orderDateFormatted = orderDate.format('MMMM D, YYYY');
    
    let orderDetailsHTML = '';
    let orderTotal = 0;
    
    // Check if order has items property and it's an array
    const orderItems = order.items && Array.isArray(order.items) ? order.items : [];
    
    // Generate HTML for each product in the order
    orderItems.forEach(item => {
      // Handle different item data structures
      const productId = item.productId || (item.product && item.product.id);
      const product = item.product || getProduct(productId);
      
      // Skip if product is not found
      if (!product) {
        // console.error(`Product not found for item in order ${order.id}`);
        return;
      }
      
      const deliveryDays = item.deliveryDays || 7; // Default to 7 days if not specified
      const deliveryDate = dayjs(orderDate).add(deliveryDays, 'day');
      const deliveryDateFormatted = deliveryDate.format('dddd, MMMM D, YYYY');
      
      orderTotal += product.priceCents * item.quantity;
      
      orderDetailsHTML += `
        <div class="product-image-container">
          <img src="${product.image}">
        </div>

        <div class="product-details">
          <div class="product-name">
            ${product.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${deliveryDateFormatted}
          </div>
          <div class="product-quantity">
            Quantity: ${item.quantity}
          </div>
          <button class="buy-again-button button-primary" data-product-id="${product.id}">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>

        <div class="product-actions">
          <a href="tracking.html?orderId=${order.id}&productId=${product.id}">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
      `;
    });
    
    // Create the complete order container
    const orderHTML = `
      <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${orderDateFormatted}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>₹${formatCurrency(orderTotal)}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
            <button class="delete-order-button button-danger" data-order-id="${order.id}" title="Delete this order">
              Delete Order
            </button>
          </div>
        </div>

        <div class="order-details-grid">
          ${orderDetailsHTML}
        </div>
      </div>
    `;
    
    ordersGrid.innerHTML += orderHTML;
  });
  
  // Add event listeners for buy again buttons
  document.querySelectorAll('.buy-again-button').forEach(button => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      // Add the product to cart
      addToCart(productId);
      alert(`Product added to cart!`);
    });
  });

  // Add event listeners for delete order buttons
  document.querySelectorAll('.delete-order-button').forEach(button => {
    button.addEventListener('click', () => {
      const orderId = button.dataset.orderId;
      if (confirm('Are you sure you want to delete this order?')) {
        // Remove the order from the orders array
        const orderIndex = orders.findIndex(order => order.id === orderId);
        if (orderIndex !== -1) {
          orders.splice(orderIndex, 1);
          localStorage.setItem('orders', JSON.stringify(orders));
          // If all orders are deleted, clear the cart
          if (orders.length === 0) {
            if (typeof clearCart === 'function') {
              clearCart();
            } else if (window.clearCart) {
              window.clearCart();
            }
            if (typeof updateCartQuantity === 'function') {
              updateCartQuantity();
            } else if (window.updateCartQuantity) {
              window.updateCartQuantity();
            }
          }
          renderOrders();
        }
      }
    });
  });
}

// Initialize the orders page
document.addEventListener('DOMContentLoaded', () => {
  if (typeof updateCartQuantity === 'function') {
    updateCartQuantity();
  } else if (window.updateCartQuantity) {
    window.updateCartQuantity();
  }
  renderOrders();
});