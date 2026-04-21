export const restaurants = [
  {
    id: 1,
    name: "Burger King",
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500&auto=format&fit=crop&q=60",
    rating: 4.2,
    cuisine: "Fast Food, Burger",
    delivery_time: "25-30 min",
    offer: "50% OFF up to ₹100",
    menu_items: [
      { id: 101, name: "Whopper", price: 199, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60" },
      { id: 102, name: "Crispy Chicken", price: 149, image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500&auto=format&fit=crop&q=60" },
      { id: 103, name: "French Fries", price: 89, image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&auto=format&fit=crop&q=60" },
      { id: 104, name: "Onion Rings", price: 119, image: "https://images.unsplash.com/photo-1639144365111-235773172e27?w=500&auto=format&fit=crop&q=60" },
      { id: 105, name: "Chocolate Shake", price: 159, image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&auto=format&fit=crop&q=60" }
    ]
  },
  {
    id: 2,
    name: "Pizza Hut",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=60",
    rating: 4.5,
    cuisine: "Italian, Pizza",
    delivery_time: "30-40 min",
    offer: "BUY 1 GET 1 FREE",
    menu_items: [
      { id: 201, name: "Margherita Pizza", price: 299, image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=500&auto=format&fit=crop&q=60" },
      { id: 202, name: "Pepperoni Feast", price: 449, image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&auto=format&fit=crop&q=60" },
      { id: 203, name: "Garlic Bread", price: 129, image: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=500&auto=format&fit=crop&q=60" },
      { id: 204, name: "Veggie Supreme", price: 399, image: "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?w=500&auto=format&fit=crop&q=60" },
      { id: 205, name: "Choco Lava Cake", price: 99, image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=500&auto=format&fit=crop&q=60" }
    ]
  },
  {
    id: 3,
    name: "Subway",
    image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=500&auto=format&fit=crop&q=60",
    rating: 4.0,
    cuisine: "Healthy, Sandwiches",
    delivery_time: "20-25 min",
    offer: "FREE DELIVERY",
    menu_items: [
      { id: 301, name: "Italian B.M.T.", price: 249, image: "https://images.unsplash.com/photo-1537210249814-b9a10a161ae4?w=500&auto=format&fit=crop&q=60" },
      { id: 302, name: "Roasted Chicken", price: 229, image: "https://images.unsplash.com/photo-1553909489-cd47e0907980?w=500&auto=format&fit=crop&q=60" },
      { id: 303, name: "Chocolate Cookie", price: 49, image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500&auto=format&fit=crop&q=60" },
      { id: 304, name: "Paneer Tikka Sub", price: 219, image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=500&auto=format&fit=crop&q=60" },
      { id: 305, name: "Fresh Salad Bowl", price: 189, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=60" }
    ]
  },
  {
    id: 4,
    name: "Starbucks",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop&q=60",
    rating: 4.7,
    cuisine: "Coffee, Beverages",
    delivery_time: "15-20 min",
    offer: "20% OFF on Beverages",
    menu_items: [
      { id: 401, name: "Java Chip Frappuccino", price: 349, image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&auto=format&fit=crop&q=60" },
      { id: 402, name: "Caffe Latte", price: 289, image: "https://images.unsplash.com/photo-1541167760496-162955ed8a9f?w=500&auto=format&fit=crop&q=60" },
      { id: 403, name: "Butter Croissant", price: 159, image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500&auto=format&fit=crop&q=60" },
      { id: 404, name: "Caramel Macchiato", price: 319, image: "https://images.unsplash.com/photo-1485808191679-5f6333f3f01b?w=500&auto=format&fit=crop&q=60" },
      { id: 405, name: "Blueberry Muffin", price: 129, image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=500&auto=format&fit=crop&q=60" }
    ]
  },
  {
    id: 5,
    name: "Biryani Blues",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500&auto=format&fit=crop&q=60",
    rating: 4.4,
    cuisine: "North Indian, Biryani",
    delivery_time: "35-45 min",
    offer: "Flat ₹125 OFF",
    menu_items: [
      { id: 501, name: "Hyderabadi Chicken Biryani", price: 329, image: "https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?w=500&auto=format&fit=crop&q=60" },
      { id: 502, name: "Mutton Dum Biryani", price: 449, image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500&auto=format&fit=crop&q=60" },
      { id: 503, name: "Paneer Biryani", price: 279, image: "https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?w=500&auto=format&fit=crop&q=60" },
      { id: 504, name: "Chicken 65", price: 249, image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=500&auto=format&fit=crop&q=60" },
      { id: 505, name: "Double ka Meetha", price: 89, image: "https://images.unsplash.com/photo-1589113123281-22872322a31d?w=500&auto=format&fit=crop&q=60" }
    ]
  },
  {
    id: 6,
    name: "Wow! Momo",
    image: "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?w=500&auto=format&fit=crop&q=60",
    rating: 4.3,
    cuisine: "Chinese, Momos",
    delivery_time: "20-30 min",
    offer: "60% OFF up to ₹120",
    menu_items: [
      { id: 601, name: "Steamed Chicken Momos", price: 169, image: "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?w=500&auto=format&fit=crop&q=60" },
      { id: 602, name: "Fried Veg Momos", price: 149, image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=500&auto=format&fit=crop&q=60" },
      { id: 603, name: "Chicken Pan Fried Momos", price: 199, image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=500&auto=format&fit=crop&q=60" },
      { id: 604, name: "Chocolate Momos", price: 129, image: "https://images.unsplash.com/photo-1542840410-3092f99611a3?w=500&auto=format&fit=crop&q=60" },
      { id: 605, name: "Chicken Thukpa", price: 229, image: "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?w=500&auto=format&fit=crop&q=60" }
    ]
  }
];

export const offers = [
  { id: 1, code: "FOOD50", discount: "50% OFF", description: "Up to ₹100 on your first order" },
  { id: 2, code: "BOGO", discount: "BUY 1 GET 1", description: "On select restaurants" },
  { id: 3, code: "FREE100", discount: "Flat ₹100 OFF", description: "On orders above ₹500" },
  { id: 4, code: "TREAT", discount: "20% OFF", description: "On all beverages and desserts" }
];
