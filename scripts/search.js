import {products} from '../data/products.js';
import {formatCurrency} from './utils/money.js';
import {cart, addToCart} from '../data/cart.js';

/**
 * Filters products based on search query
 * @param {string} query - The search query
 * @returns {Array} - Filtered products
 */
function filterProducts(query) {
  if (!query) {
    return products; // Return all products if query is empty
  }
  
  const lowerCaseQuery = query.toLowerCase();
  
  return products.filter(product => {
    // Search in product name
    if (product.name.toLowerCase().includes(lowerCaseQuery)) {
      return true;
    }
    
    // Search in keywords
    if (product.keywords && product.keywords.some(keyword => 
      keyword.toLowerCase().includes(lowerCaseQuery))) {
      return true;
    }
    
    return false;
  });
}

/**
 * Generates HTML for the filtered products
 * @param {Array} filteredProducts - Array of filtered products
 * @returns {string} - HTML string for the products grid
 */
function generateProductsHTML(filteredProducts) {
  if (filteredProducts.length === 0) {
    return '<div class="no-results">No products found matching your search.</div>';
  }
  
  let productsHTML = '';
  
  filteredProducts.forEach((product) => {
    productsHTML += `
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image"
            src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars"
            src="${product.getStarsUrl ? product.getStarsUrl() : `images/ratings/rating-${product.rating.stars * 10}.png`}">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          ${product.getPrice ? product.getPrice() : `₹${formatCurrency(product.priceCents)}`}
        </div>

        <div class="product-quantity-container">
          <select>
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        ${product.type === 'clothing' && product.sizeChartLink ? 
          `<a href="${product.sizeChartLink}" target="_blank">Size chart</a>` : ''}

        <div class="product-spacer"></div>

        <div class="added-to-cart">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart"
        data-product-id="${product.id}">
          Add to Cart
        </button>
      </div>
    `;
  });
  
  return productsHTML;
}

/**
 * Performs search and updates the products grid
 * @param {string} query - The search query
 */
export function performSearch(query) {
  const filteredProducts = filterProducts(query);
  const productsHTML = generateProductsHTML(filteredProducts);
  
  document.querySelector('.js-products-grid').innerHTML = productsHTML;
  
  // Reattach event listeners for add to cart buttons
  attachAddToCartListeners();
}

/**
 * Attaches event listeners to add to cart buttons
 */
function attachAddToCartListeners() {
  document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      const quantitySelect = button.closest('.product-container').querySelector('.product-quantity-container select');
      const quantity = Number(quantitySelect.value);
      addToCart(productId, quantity);
      
      // Update cart quantity
      let cartQuantity = 0;
      
      cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
      });

      document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
    });
  });
}

// Initialize search functionality
export function initializeSearch() {
  const searchInput = document.querySelector('.js-search-input');
  const searchButton = document.querySelector('.js-search-button');
  
  // Search button click event
  searchButton.addEventListener('click', () => {
    performSearch(searchInput.value);
  });
  
  // Enter key press event
  searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      performSearch(searchInput.value);
    }
  });
}
