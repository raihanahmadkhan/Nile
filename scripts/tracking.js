import { getProduct } from '../data/products.js';
import { orders } from '../data/orders.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

// Make sure we have the latest orders from localStorage
const localStorageOrders = JSON.parse(localStorage.getItem('orders')) || [];

document.addEventListener('DOMContentLoaded', () => {
  // Get URL parameters
  const url = new URL(window.location.href);
  const orderId = url.searchParams.get('orderId');
  const productId = url.searchParams.get('productId');
  
  // Get product information
  const product = getProduct(productId);
  
  // Find the order in the orders array - first check localStorage, then fallback to imported orders
  const allOrders = localStorageOrders.length > 0 ? localStorageOrders : orders;
  const order = allOrders.find(order => order.id === orderId);
  
  // Find the specific item in the order
  const orderItem = order?.items?.find(item => 
    (item.productId === productId) || (item.product && item.product.id === productId)
  );
  
  // Defensive: If product, order, or orderItem is missing, show error and stop
  if (!product || !order || !orderItem) {
    let errorMessage = 'Information not found.';
    if (!product) errorMessage = 'Product information not found.';
    else if (!order) errorMessage = 'Order information not found.';
    else if (!orderItem) errorMessage = 'This product was not found in the specified order.';
    document.querySelector('.order-tracking').innerHTML = `
      <div class="error-message">
        <p>${errorMessage}</p>
        <a href="orders.html" class="button-primary">Return to Orders</a>
      </div>
    `;
    return;
  }

  // Only update DOM if all data is found
  if (product && order && orderItem) {
    // Calculate delivery date based on order date and delivery days
    const orderDate = order.orderDate ? dayjs(order.orderDate) : dayjs();
    const deliveryDays = orderItem.deliveryDays || 7; // Default to 7 days if not specified
    const deliveryDate = orderDate.add(deliveryDays, 'day');
    const deliveryDateFormatted = deliveryDate.format('dddd, MMMM D, YYYY');

    // Set shipping status based on current date vs delivery date
    const currentDate = dayjs();
    const totalDays = deliveryDate.diff(orderDate, 'day');
    const daysPassed = currentDate.diff(orderDate, 'day');
    const progressPercent = Math.min(Math.max((daysPassed / totalDays) * 100, 0), 100);

    let progressStatus = 'Preparing';
    if (progressPercent >= 30) {
      progressStatus = 'Shipped';
    }
    if (progressPercent >= 100) {
      progressStatus = 'Delivered';
    }

    // Dynamically render the tracked product's info
    document.querySelector('.order-tracking').innerHTML = `
      <a class="back-to-orders-link link-primary" href="orders.html">
        View your orders
      </a>
      <div class="delivery-date">Arriving on ${deliveryDateFormatted}</div>
      <div class="product-info">${product.name}</div>
      <div class="product-info">Quantity: ${orderItem.quantity}</div>
      <img class="product-image" src="${product.image}">
      <div class="progress-labels-container">
        <div class="progress-label${progressStatus === 'Preparing' ? ' current-status' : ''}">Preparing</div>
        <div class="progress-label${progressStatus === 'Shipped' ? ' current-status' : ''}">Shipped</div>
        <div class="progress-label${progressStatus === 'Delivered' ? ' current-status' : ''}">Delivered</div>
      </div>
      <div class="progress-bar-container">
        <div class="progress-bar" style="width: ${progressPercent}%"></div>
      </div>
    `;
  } else {
    // If product, order, or order item not found, display a message
    let errorMessage = 'Information not found.';
    if (!product) {
      errorMessage = 'Product information not found.';
    } else if (!order) {
      errorMessage = 'Order information not found.';
    } else if (!orderItem) {
      errorMessage = 'This product was not found in the specified order.';
    }
    
    document.querySelector('.order-tracking').innerHTML = `
      <div class="error-message">
        <p>${errorMessage}</p>
        <a href="orders.html" class="button-primary">Return to Orders</a>
      </div>
    `;
  }
});
