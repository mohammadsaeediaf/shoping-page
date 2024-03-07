const cartBtn = document.querySelector(".cart-btn");
const cartModal = document.querySelector(".cart");
const backDrop = document.querySelector(".backdrop");
const closeModal = document.querySelector(".cart-item-confirm");
const productCenter = document.querySelector(".products-center");

let cart = [];

function showModalFunction() {
  backDrop.style.display = "block";
  cartModal.style.opacity = "1";
  cartModal.style.top = "20%";
}

function closeModalFunction() {
  backDrop.style.display = "none";
  cartModal.style.opacity = "0";
  cartModal.style.top = "-100%";
}

cartBtn.addEventListener("click", showModalFunction);
closeModal.addEventListener("click", closeModalFunction);
backDrop.addEventListener("click", closeModalFunction);

// 1. Add products class
// 2. Add Ui class
// 3. Add storage class
// 4. dom content loaded
import { productsData } from "./product.js";

class ProductsData {
  getProduct() {
    return productsData;
  }
}

class UI {
  displayProduct(product) {
    let result = "";
    product.forEach((element) => {
      result += `<div class="product">
        <div class="img-container">
            <img src=${element.imageUrl} class="product-img" />
            </div>
            <div class="product-desc">
                <p class="product-price">$ ${element.price}</p>
                <p class="product-title">${element.title}</p>
            </div>
            <button class="btn add-to-cart " data-id=${element.id}>
            <i class="fas fa-shopping-cart"></i>
                add to cart
            </button>
        </div>`;
    });
    productCenter.innerHTML = result;
  }

  getProductBtn() {
    const getCartBtn = document.querySelectorAll(".add-to-cart");
    const buttons = [...getCartBtn];

    buttons.forEach((btn) => {
      const id = btn.dataset.id;
      const isInCart = cart.find((p) => p.id === id);

      if (isInCart) {
        btn.innerText = "In cart";
        btn.disabled = true;
        console.log(btn.id);
      }

      btn.addEventListener("click", (event) => {
        console.log(event.target);
        event.target.innerText = "In Cart";
        event.target.disabled = true;

        // get products from storage
        const addedProduct = {
          ...Storage.getProductFromStorage(id),
          quantity: 1,
        };

        // add to cart
        cart = [...cart, { addedProduct }];
        // save cart to localstorage
        Storage.saveCarts(cart);
        // Update cart shop

        // add to cart item
      });
    });
  }
}

class Storage {
  // 1.save Products
  static saveProducts(product) {
    localStorage.setItem("Products", JSON.stringify(product));
  }

  // 2. get products from storage
  static getProductFromStorage(id) {
    const getProduct = JSON.parse(localStorage.getItem("Products"));
    console.log(typeof getProduct);
    return getProduct.find((p) => p.id === parseInt(id));
  }
  // 3. save carts
  static saveCarts(cart) {
    localStorage.setItem("Carts", JSON.stringify(cart));
  }
  // 4. get carts
}

document.addEventListener("DOMContentLoaded", (event) => {
  const products = new ProductsData();

  const ui = new UI();
  ui.displayProduct(productsData);
  ui.getProductBtn();
  Storage.saveProducts(productsData);
  // console.log(product.getProduct());
});
