// This file handles displaying and managing product features
import {products} from '../data/products.js';

/**
 * Generates HTML for product features section
 * @param {string} productId - The ID of the product to show features for
 * @returns {string} HTML content for the product features
 */
export function generateProductFeatures(productId) {
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    return '<div class="no-features">Product not found</div>';
  }
  
  let featuresHTML = `
    <div class="product-features">
      <h3>Product Features</h3>
      <div class="product-rating">
        <img class="product-rating-stars" src="${product.getStarsUrl ? product.getStarsUrl() : `images/ratings/rating-${product.rating.stars * 10}.png`}">
        <span class="rating-count">${product.rating.count} ratings</span>
      </div>
      <div class="product-price-feature">
        Price: ${product.getPrice ? product.getPrice() : `₹${(product.priceCents / 100).toFixed(2)}`}
      </div>
    `;
    
  // Add keywords as features
  if (product.keywords && product.keywords.length > 0) {
    featuresHTML += '<div class="product-categories">';
    product.keywords.forEach(keyword => {
      featuresHTML += `<span class="product-category">${keyword}</span>`;
    });
    featuresHTML += '</div>';
  }
  
  // Add size chart for clothing items
  if (product.type === 'clothing' && product.sizeChartLink) {
    featuresHTML += `
      <div class="size-chart-container">
        <a href="${product.sizeChartLink}" target="_blank" class="size-chart-link">
          View Size Chart
        </a>
      </div>
    `;
  }
  
  featuresHTML += '</div>';
  
  return featuresHTML;
}

/**
 * Displays product features in the specified container
 * @param {string} productId - The ID of the product to show features for
 * @param {string} containerId - The ID of the container element
 */
export function displayProductFeatures(productId, containerId) {
  const container = document.getElementById(containerId);
  if (container) {
    container.innerHTML = generateProductFeatures(productId);
  }
}

export default {
  generateProductFeatures,
  displayProductFeatures
};
