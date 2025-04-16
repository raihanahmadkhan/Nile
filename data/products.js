import {formatCurrency} from '../scripts/utils/money.js';

class Product {
  id;
  image;
  name;
  rating;
  priceCents;

  constructor(productDetails) {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
  }

  getStarsUrl() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }

  getPrice() {
    return `₹${formatCurrency(this.priceCents)}`;
  }

  extraInfoHTML() {
    return '';
  }
}

class Clothing extends Product {
  sizeChartLink;

  constructor(productDetails) {
    super(productDetails);
    this.sizeChartLink = productDetails.sizeChartLink;
  }

  extraInfoHTML() {
    // super.extraInfoHTML();
    return `
      <a href="${this.sizeChartLink}" target="_blank">
        Size chart
      </a>
    `;
  }
}


// Create array of product data
const productData = [
  {
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    image: "images/products/athletic-cotton-socks-6-pairs.jpg",
    name: "JOCKEY - Cotton Men Ankle Length Socks",
    rating: {
      stars: 4.5,
      count: 2368
    },
    priceCents: 41500,
    keywords: [
      "socks",
      "sports",
      "apparel"
    ]
  },
  {
    id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    image: "images/products/intermediate-composite-basketball.jpg",
    name: "KOOKABURRA Cricket Ball",
    rating: {
      stars: 4,
      count: 158
    },
    priceCents: 99900,
    keywords: [
      "sports",
      "basketballs"
    ]
  },
  {
    id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
    image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
    name: "Lacoste - Men's Polos",
    rating: {
      stars: 5,
      count: 103
    },
    priceCents: 429000,
    keywords: [
      "tshirts",
      "apparel",
      "mens"
    ],
    type: "clothing",
    sizeChartLink: "images/clothing-size-chart.png"
  },
  {
    id: "54e0eccd-8f36-462b-b68a-8182611d9add",
    image: "images/products/black-2-slot-toaster.jpg",
    name: "2 Slot Toaster - Black",
    rating: {
      stars: 5,
      count: 217
    },
    priceCents: 109900,
    keywords: [
      "toaster",
      "kitchen",
      "appliances"
    ]
  },
  {
    id: "3ebe75dc-64d2-4137-8860-1f5a963e534b",
    image: "images/products/6-piece-white-dinner-plate-set.jpg",
    name: "Cello Opalware White Dinner Plate Set",
    rating: {
      stars: 4,
      count: 377
    },
    priceCents: 129900,
    keywords: [
      "plates",
      "kitchen",
      "dining"
    ]
  },
  {
    id: "8c9c52b5-5a19-4bcb-a5d1-158a74287c53",
    image: "images/products/6-piece-non-stick-baking-set.webp",
    name: "6-Piece Nonstick, Carbon Steel Oven Bakeware Baking Set",
    rating: {
      stars: 4.5,
      count: 1756
    },
    priceCents: 199900,
    keywords: [
      "kitchen",
      "cookware"
    ]
  },
  {
    id: "dd82ca78-a18b-4e2a-9250-31e67412f98d",
    image: "images/products/plain-hooded-fleece-sweatshirt-yellow.jpg",
    name: "Allen Solly - Men's Cotton Crew Neck Sweatshirt",
    rating: {
      stars: 4.5,
      count: 3177
    },
    priceCents: 97400,
    keywords: [
      "hoodies",
      "sweaters",
      "apparel"
    ]
  },
  {
    id: "77919bbe-0e56-475b-adde-4f24dfed3a04",
    image: "images/products/luxury-tower-set-6-piece.jpg",
    name: "SENSES by Riba 703 GSM 6 pcs Towels Set",
    rating: {
      stars: 4.5,
      count: 1444
    },
    priceCents: 159900,
    keywords: [
      "bathroom",
      "washroom",
      "restroom",
      "towels",
      "bath towels"
    ]
  },
  {
    id: "3fdfe8d6-9a15-4979-b459-585b0d0545b9",
    image: "images/products/liquid-laundry-detergent-plain.jpg",
    name: "Surf Excel Matic Top Load Liquid Detergent",
    rating: {
      stars: 4,
      count: 6009
    },
    priceCents: 45500,
    keywords: [
      "bathroom",
      "cleaning"
    ]
  },
  {
    id: "58b4fc92-e98c-42aa-8c55-b6b79996769a",
    image: "images/products/knit-athletic-sneakers-gray.jpg",
    name: "adidas mens Luft Pace M Running Shoe",
    rating: {
      stars: 4,
      count: 124
    },
    priceCents: 479900,
    keywords: [
      "shoes",
      "running shoes",
      "footwear"
    ]
  },
  {
    id: "5968897c-4d27-4872-89f6-5bcb052746d7",
    image: "images/products/women-chiffon-beachwear-coverup-black.jpg",
    name: "rytras Women's Floral Printed Top",
    rating: {
      stars: 4.5,
      count: 235
    },
    priceCents: 51900,
    keywords: [
      "robe",
      "swimsuit",
      "swimming",
      "bathing",
      "apparel"
    ],
    type: "clothing",
    sizeChartLink: "images/clothing-size-chart.png"
  },
  {
    id: "aad29d11-ea98-41ee-9285-b916638cac4a",
    image: "images/products/round-sunglasses-black.jpg",
    name: "Round Sunglasses",
    rating: {
      stars: 4.5,
      count: 30
    },
    priceCents: 156000,
    keywords: [
      "accessories",
      "shades"
    ]
  },
  {
    id: "04701903-bc79-49c6-bc11-1af7e3651358",
    image: "images/products/women-beach-sandals.jpg",
    name: "Women's Two Strap Buckle Sandals - Tan",
    rating: {
      stars: 4.5,
      count: 562
    },
    priceCents: 99900,
    keywords: [
      "footwear",
      "sandals",
      "womens",
      "beach",
      "summer"
    ]
  },
  {
    id: "901eb2ca-386d-432e-82f0-6fb1ee7bf969",
    image: "images/products/blackout-curtain-set-beige.webp",
    name: "Blackout Curtains Set 4-Pack - Beige",
    rating: {
      stars: 4.5,
      count: 232
    },
    priceCents: 99900,
    keywords: [
      "bedroom",
      "curtains",
      "home"
    ]
  },
  {
    id: "82bb68d7-ebc9-476a-989c-c78a40ee5cd9",
    image: "images/products/men-slim-fit-summer-shorts-gray.jpg",
    name: "Men's Slim-Fit Summer Shorts",
    rating: {
      stars: 4,
      count: 160
    },
    priceCents: 69900,
    keywords: [
      "shorts",
      "apparel",
      "mens"
    ]
  },
  {
    id: "c2a82c5e-aff4-435f-9975-517cfaba2ece",
    image: "images/products/electric-glass-and-steel-hot-water-kettle.webp",
    name: "Pigeon by Stovekraft Amaze Plus Electric Kettle (14289) with Stainless Steel Body",
    rating: {
      stars: 5,
      count: 846
    },
    priceCents: 54900,
    keywords: [
      "water boiler",
      "appliances",
      "kitchen"
    ]
  },
  {
    id: "6b07d4e7-f540-454e-8a1e-363f25dbae7d",
    image: "images/products/facial-tissue-2-ply-18-boxes.jpg",
    name: "Softouch Tissue Paper Napkins",
    rating: {
      stars: 4,
      count: 99
    },
    priceCents: 16900,
    keywords: [
      "kleenex",
      "tissues",
      "kitchen",
      "tissues box",
      "napkins"
    ]
  },
  {
    id: "a82c6bac-3067-4e68-a5ba-d827ac0be010",
    image: "images/products/straw-sunhat.webp",
    name: "Straw Lifeguard Sun Hat",
    rating: {
      stars: 4,
      count: 215
    },
    priceCents: 126200,
    keywords: [
      "hats",
      "straw hats",
      "summer",
      "apparel"
    ]
  },
  {
    id: "e4f64a65-1377-42bc-89a5-e572d19252e2",
    image: "images/products/sky-flower-stud-earrings.webp",
    name: "Sterling Silver Sky Flower Stud Earrings",
    rating: {
      stars: 4.5,
      count: 52
    },
    priceCents: 99900,
    keywords: [
      "jewelry",
      "accessories",
      "womens"
    ]
  },
  {
    id: "b0f17cc5-8b40-4ca5-9142-b61fe3d98c85",
    image: "images/products/women-stretch-popover-hoodie-black.jpg",
    name: "Women's Stretch Popover Hoodie",
    rating: {
      stars: 4.5,
      count: 2465
    },
    priceCents: 79900,
    keywords: [
      "hooded",
      "hoodies",
      "sweaters",
      "womens",
      "apparel"
    ],
    type: "clothing",
    sizeChartLink: "images/clothing-size-chart.png"
  },
  {
    id: "b86ddc8b-3501-4b17-9889-a3bad6fb585f",
    image: "images/products/trash-can-with-foot-pedal-50-liter.jpg",
    name: "Mumma's LIFE Stainless Steel Plain Pedal Bin with Plastic Bucket And Lid",
    rating: {
      stars: 4.5,
      count: 2286
    },
    priceCents: 79900,
    keywords: [
      "garbage",
      "bins",
      "cans",
      "kitchen"
    ]
  },
  {
    id: "19c6a64a-5463-4d45-9af8-e41140a4100c",
    image: "images/products/duvet-cover-set-blue-twin.jpg",
    name: "Duvet Cover Set with Zipper Closure",
    rating: {
      stars: 4,
      count: 456
    },
    priceCents: 179900,
    keywords: [
      "bedroom",
      "bed sheets",
      "sheets",
      "covers",
      "home"
    ]
  },
  {
    id: "d2785924-743d-49b3-8f03-ec258e640503",
    image: "images/products/women-chunky-beanie-gray.webp",
    name: "Women's Chunky Cable Beanie - Gray",
    rating: {
      stars: 5,
      count: 83
    },
    priceCents: 19900,
    keywords: [
      "hats",
      "winter hats",
      "beanies",
      "tuques",
      "apparel",
      "womens"
    ]
  },
  {
    id: "ee1f7c56-f977-40a4-9642-12ba5072e2b0",
    image: "images/products/men-chino-pants-beige.jpg",
    name: "Men's Classic-fit Pleated Chino Pants",
    rating: {
      stars: 4.5,
      count: 9017
    },
    priceCents: 99900,
    keywords: [
      "pants",
      "apparel",
      "mens"
    ]
  },
  {
    id: "1c079479-8586-494f-ab53-219325432536",
    image: "images/products/men-athletic-shoes-green.jpg",
    name: "Puma unisex-adult Rider Fv Future Vintage Sneaker",
    rating: {
      stars: 4,
      count: 229
    },
    priceCents: 579900,
    keywords: [
      "shoes",
      "running shoes",
      "footwear",
      "mens"
    ]
  },
  {
    id: "4df68c27-fd59-4a6a-bbd1-e754ddb6d53c",
    image: "images/products/men-navigator-sunglasses-brown.jpg",
    name: "Men's Navigator Sunglasses Pilot",
    rating: {
      stars: 3.5,
      count: 42
    },
    priceCents: 49900,
    keywords: [
      "sunglasses",
      "glasses",
      "accessories",
      "shades"
    ]
  },
].map((productDetails) => {
  if (productDetails.type === 'clothing') {
    return new Clothing(productDetails);
  }
  return new Product(productDetails);
});

export const products = productData;

export function getProduct(productId) {
  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  return matchingProduct;
}
