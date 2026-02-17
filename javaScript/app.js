const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const dropWordMenu = document.getElementById("dropdown-menu");
const cardContainer = document.getElementById("card-container");
const categorieContainer = document.getElementById("categorie-container");
const allCardContainer = document.getElementById("all-card-container");

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
  const url = `https://fakestoreapi.com/products`;

  try {
    const response = await fetch(url);
    const data = await response.json();
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
                    <button class="btn px-10 md:px-14">
                      <i class="fa-regular fa-eye"></i> Details
                    </button>
                    <button class="btn btn-primary px-10 md:px-14">
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
    categorieContainer.innerHTML += `
        <h1 class="cursor-pointer hover:bg-indigo-600 hover:text-white border 
            border-gray-200 text-lg px-3 py-1 md:p-2 md:px-5 md:text-xl rounded-full categorie">${categorie}</h1>
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
                    <button class="btn px-10 md:px-6">
                      <i class="fa-regular fa-eye"></i> Details
                    </button>
                    <button class="btn btn-primary px-10 md:px-10">
                      <i class="fa-solid fa-cart-shopping"></i> Add
                    </button>
                  </div>
                </div>
              </div>
    `;
  });
};



loadProducts();
loadCategories();
