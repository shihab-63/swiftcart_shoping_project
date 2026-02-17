const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const dropWordMenu = document.getElementById("dropdown-menu");
const cardContainer = document.getElementById("card-container");
const categorieContainer = document.getElementById("categorie-container");
const allCardContainer = document.getElementById("all-card-container");
const dailogModal = document.getElementById("my_modal_5");
const showModalDetails = document.getElementById("showModalDetails");
const sections = document.querySelectorAll(".page-section");
const navLinks = document.querySelectorAll(".nav-item");

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let allProducts = [];

// Routeing Functionality
function switchTab(tabId) {
  sections.forEach((section) => {
    section.classList.add("hidden");
  });
  const activeSection = document.getElementById(tabId);
  if (activeSection) {
    activeSection.classList.remove("hidden");
  }

  navLinks.forEach((link) => {
    if (link.getAttribute("data-tab") === tabId) {
      link.classList.add("text-blue-600");
      link.classList.remove("text-gray-600");
    } else {
      link.classList.remove("text-blue-600");
      link.classList.add("text-gray-600");
    }
  });
}

if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
}

if (dropWordMenu) {
  dropWordMenu.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
  });
}

//! Load All Products
const loadProducts = async () => {
  showLoading();
  const url = `https://fakestoreapi.com/products`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    allProducts = data;
    const threeData = data.slice(0, 3);
    displayAllProducts(data);
    displayProduct(threeData);
  } catch (error) {
    console.log(error);
  }
};

//? Display 3 Products
const displayProduct = (products) => {
  cardContainer.innerHTML = "";
  products.forEach((product) => {
    cardContainer.innerHTML += `
        <div
            class="flex flex-col gap-2 border border-gray-300 rounded-xl hover:shadow-xl transition-shadow duration-400"
        >
            <div class="bg-gray-200 h-[300px] rounded-t-xl flex justify-center items-center">
                <img
                class="w-44 mx-auto hover:scale-110 transition-transform duration-500"
                src="${product.image}"
                alt=""
                />
            </div>
                <div class="p-3">
                  <div class="flex justify-between items-center">
                    <p class="bg-indigo-200 rounded-lg px-1 text-indigo-600">${product.category}</p>
                    <p class="text-gray-500">
                      <span
                        ><i class="fa-solid fa-star text-yellow-500"></i
                      ></span>
                      <span>${product.rating.rate} (${product.rating.count})</span>
                    </p>
                  </div>
                  <h1 class="text-xl pt-4 truncate">${product.title}</h1>
                  <p class="text-2xl font-medium py-4"><span>$</span><span>${product.price}</span></p>
                  <div class="flex justify-between">
                    <button onclick="singleProductDetails(${product.id})" class="btn px-10 md:px-14">
                      <i class="fa-regular fa-eye"></i> Details
                    </button>
                    <button onclick="addToCart(${product.id})" class="btn btn-primary px-10 md:px-14">
                      <i class="fa-solid fa-cart-shopping"></i> Add
                    </button>
                  </div>
                </div>
              </div>
    `;
  });
};

//? Load Categories
const loadCategories = async () => {
  const url = `https://fakestoreapi.com/products/categories`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const allCategories = ["All", ...data];
    displayCategories(allCategories);
  } catch (error) {
    console.log(error);
  }
};

//? Display Categories
const displayCategories = (categories) => {
  categories.forEach((categorie) => {
    const activeClass = categorie === "All" ? "bg-indigo-600 text-white" : "";
    categorieContainer.innerHTML += `
        <h1 class="cursor-pointer transition-all duration-150 active:translate-y-0.5 hover:bg-indigo-600 hover:text-white border 
            border-gray-200 text-lg px-3 py-1 md:p-2 md:px-5 md:text-xl rounded-full categorie ${activeClass}">${capitalizeFirstLetter(categorie)}</h1>
    `;
  });
};

//? Display ALL Products
const displayAllProducts = (products) => {
  allCardContainer.innerHTML = "";
  products.forEach((product) => {
    allCardContainer.innerHTML += `
        <div
            class="flex flex-col gap-2 border border-gray-300 rounded-xl hover:shadow-xl transition-shadow duration-400"
        >
            <div class="bg-gray-200 h-[280px] rounded-t-xl flex justify-center items-center">
                <img
                class="w-38 mx-auto hover:scale-105 transition-transform duration-500"
                src="${product.image}"
                alt=""
                />
            </div>
                <div class="p-3">
                  <div class="flex justify-between items-center">
                    <p class="bg-indigo-200 rounded-lg px-1 text-indigo-600">${product.category}</p>
                    <p class="text-gray-500">
                      <span
                        ><i class="fa-solid fa-star text-yellow-500"></i
                      ></span>
                      <span>${product.rating.rate} (${product.rating.count})</span>
                    </p>
                  </div>
                  <h1 class="text-xl pt-4 truncate">${product.title}</h1>
                  <p class="text-2xl font-medium py-4"><span>$</span><span>${product.price}</span></p>
                  <div class="flex justify-between">
                    <button onclick="singleProductDetails(${product.id})" class="btn px-10 md:px-6">
                      <i class="fa-regular fa-eye"></i> Details
                    </button>
                    <button onclick="addToCart(${product.id})" class="btn btn-primary px-10 md:px-10">
                      <i class="fa-solid fa-cart-shopping"></i> Add
                    </button>
                  </div>
                </div>
              </div>
    `;
  });
};

// Add Active Color
categorieContainer.addEventListener("click", (e) => {
  //   if (!e.target.closest("h1")) return;
  const allH1Tags = document.querySelectorAll(".categorie");
  allH1Tags.forEach((h1) => {
    h1.classList.remove("bg-indigo-600");
    h1.classList.remove("text-white");
  });

  if (e.target.closest("h1")) {
    e.target.classList.add("bg-indigo-600");
    e.target.classList.add("text-white");
  }

  // Show single categories
  displayFilterCategorie(e.target.closest("h1").innerText);
});

//! Load Single Categorie
const displayFilterCategorie = async (category) => {
  let url = `https://fakestoreapi.com/products`;

  if (category !== "All") {
    url = `https://fakestoreapi.com/products/category/${category.toLowerCase()}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    displayAllProducts(data);
  } catch (error) {
    console.log(error);
  }
};

// Capitalize first letter
const capitalizeFirstLetter = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

//! Load Single Product Details
const singleProductDetails = async (id) => {
  // Load single product details
  const url = `https://fakestoreapi.com/products/${id}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    displayModalDetails(data);
  } catch (error) {
    console.log(error);
  }
};

//? Display Modal Details
const displayModalDetails = (modals) => {
  showModalDetails.innerHTML = "";

  showModalDetails.innerHTML += `
    <div class="flex-1 flex justify-center items-center bg-white p-5 rounded-lg">
          <img src="${modals.image}" class="max-h-[300px] object-contain" alt="product-image" />
    </div>
    <div class="flex-1 space-y-4 p-4">
          <h2 class="text-2xl font-bold">${modals.title}</h2>
          <p class="text-gray-500 text-sm">${modals.description}</p>
          <div class="flex justify-between items-center gap-2">
             <span class="badge p-3 badge-primary badge-outline">${modals.category}</span>
             <span class="flex items-center text-xl text-yellow-500">
                <i class="fa-solid fa-star mr-1"></i> ${modals.rating.rate}
             </span>
          </div>
          <h3 class="text-3xl font-bold mt-6">$${modals.price}</h3>
    </div>
  `;
  dailogModal.showModal();
};

// Show Loading
const showLoading = () => {
  allCardContainer.innerHTML = `
        <div class="flex w-52 flex-col gap-4">
                <div class="skeleton h-32 w-full"></div>
                <div class="skeleton h-4 w-28"></div>
                <div class="skeleton h-4 w-full"></div>
                <div class="skeleton h-4 w-full"></div>
        </div>
        <div class="flex w-52 flex-col gap-4">
                <div class="skeleton h-32 w-full"></div>
                <div class="skeleton h-4 w-28"></div>
                <div class="skeleton h-4 w-full"></div>
                <div class="skeleton h-4 w-full"></div>
        </div>
        <div class="flex w-52 flex-col gap-4">
                <div class="skeleton h-32 w-full"></div>
                <div class="skeleton h-4 w-28"></div>
                <div class="skeleton h-4 w-full"></div>
                <div class="skeleton h-4 w-full"></div>
        </div>
        <div class="flex w-52 flex-col gap-4">
                <div class="skeleton h-32 w-full"></div>
                <div class="skeleton h-4 w-28"></div>
                <div class="skeleton h-4 w-full"></div>
                <div class="skeleton h-4 w-full"></div>
        </div>
    `;
};

// Add to Cart
const addToCart = (id) => {
  const product = allProducts.find((p) => p.id === id);
  cart.push(product);
  updateCartCount();
  console.log("Product added:", product.title);
};

// Modal Open
const showCart = () => {
  const cartContainer = document.getElementById("cart-items-container");
  const totalPriceElement = document.getElementById("cart-total-price");
  const cartModal = document.getElementById("cart_modal");

  cartContainer.innerHTML = "";
  let totalPrice = 0;

  if (cart.length === 0) {
    cartContainer.innerHTML = `<p class="text-center text-gray-400 py-4">Your cart is empty.</p>`;
  } else {
    cart.forEach((item, index) => {
      totalPrice += item.price;

      cartContainer.innerHTML += `
        <div class="flex items-center justify-between border-b border-gray-100 pb-2 mb-2">
            <div class="flex items-center gap-3">
                <img src="${item.image}" class="w-10 h-10 object-contain p-1 border rounded">
                <div>
                    <h4 class="font-bold text-sm w-40 truncate" title="${item.title}">${item.title}</h4>
                    <p class="text-gray-500 text-xs">$${item.price}</p>
                </div>
            </div>
            
            <button onclick="removeFromCart(${index})" class="btn btn-sm btn-circle btn-ghost text-red-500 hover:bg-red-50">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
      `;
    });
  }

  if (totalPriceElement) {
    totalPriceElement.innerText = totalPrice.toFixed(2);
  }
  if (!cartModal.open) {
    cartModal.showModal();
  }
};

const removeFromCart = (index) => {
  cart.splice(index, 1);
  updateCartCount();
  showCart();
};

const updateCartCount = () => {
  const countElement = document.getElementById("cart-count");
  if (countElement) {
    countElement.innerText = cart.length;
  }
  localStorage.setItem("cart", JSON.stringify(cart));
};

loadProducts();
loadCategories();
switchTab("home");
updateCartCount();
