const menuData = [
  // Mains
  { id: 1, name: "Margherita Pizza", category: "mains", price: 12.99, img: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500&auto=format&fit=crop" },
  { id: 2, name: "Cheeseburger", category: "mains", price: 9.99, img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop" },
  { id: 3, name: "Ribeye Steak", category: "mains", price: 24.50, img: "https://images.unsplash.com/photo-1558030006-450675393462?w=500&auto=format&fit=crop" },
  
  // Drinks
  { id: 4, name: "Iced Latte", category: "drinks", price: 4.50, img: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500&auto=format&fit=crop" },
  { id: 5, name: "Fresh Lemonade", category: "drinks", price: 3.80, img: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=500&auto=format&fit=crop" },
  { id: 6, name: "Berry Smoothie", category: "drinks", price: 5.20, img: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=500&auto=format&fit=crop" },
  
  // Desserts
  { id: 7, name: "Chocolate Lava Cake", category: "desserts", price: 6.50, img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&auto=format&fit=crop" },
  { id: 8, name: "NY Cheesecake", category: "desserts", price: 7.00, img: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500&auto=format&fit=crop" }
];

let cart = [];

const menuGrid = document.getElementById('menuGrid');
const cartSidebar = document.getElementById('cartSidebar');

// Render Menu Cards
function renderMenu(items) {
  if (items.length === 0) {
    menuGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #888;">No items found.</p>`;
    return;
  }

  menuGrid.innerHTML = items.map(item => `
    <div class="card">
      <img src="${item.img}" alt="${item.name}">
      <div class="card-body">
        <h3>${item.name}</h3>
        <p class="card-price">$${item.price.toFixed(2)}</p>
        <button class="add-btn" onclick="addToCart(${item.id})">Add to Order</button>
      </div>
    </div>
  `).join('');
}

// Category Filter Handling
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    
    const cat = e.target.dataset.category;
    const filtered = cat === 'all' ? menuData : menuData.filter(item => item.category === cat);
    renderMenu(filtered);
  });
});

// Live Search Handling
document.getElementById('searchInput').addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase().trim();
  const filtered = menuData.filter(item => item.name.toLowerCase().includes(query));
  renderMenu(filtered);
});

// Shopping Cart Functions
function addToCart(id) {
  const item = menuData.find(i => i.id === id);
  cart.push(item);
  updateCart();
}

function updateCart() {
  document.getElementById('cartCount').innerText = cart.length;
  const cartItems = document.getElementById('cartItems');
  
  if (cart.length === 0) {
    cartItems.innerHTML = `<p style="color: #888; text-align: center; margin-top: 2rem;">Your cart is empty.</p>`;
  } else {
    cartItems.innerHTML = cart.map(item => `
      <div class="cart-item">
        <span>${item.name}</span>
        <span>$${item.price.toFixed(2)}</span>
      </div>
    `).join('');
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  document.getElementById('cartTotal').innerText = total.toFixed(2);
}

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is currently empty!");
    return;
  }
  alert(`Order submitted successfully! Total: $${cart.reduce((sum, i) => sum + i.price, 0).toFixed(2)}`);
  cart = [];
  updateCart();
  cartSidebar.classList.remove('open');
}

// Cart Drawer Toggles
document.getElementById('cartBtn').addEventListener('click', () => cartSidebar.classList.add('open'));
document.getElementById('closeCart').addEventListener('click', () => cartSidebar.classList.remove('open'));

// Initial Load Initialization
renderMenu(menuData);
updateCart();