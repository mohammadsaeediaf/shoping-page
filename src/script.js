const cartBtn = document.querySelector(".cart-btn");
const cartModal = document.querySelector(".cart");
const backDrop = document.querySelector(".backdrop");
const closeModal = document.querySelector(".cart-item-confirm");
const productCenter = document.querySelector(".products-center");
const cartSection = document.querySelector(".cart-content");
const quantityOfOrder = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const clearCart = document.querySelector(".clear-cart");

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

let buttons = [];

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
            <button class="btn add-to-cart" data-id=${element.id}>
                add to cart
            </button>
        </div>`;
    });
    productCenter.innerHTML = result;
  }

  getProductBtn() {
    const getCartBtn = [...document.querySelectorAll(".add-to-cart")];
    buttons = getCartBtn;

    getCartBtn.forEach((btn) => {
      const id = btn.dataset.id;
      const isInCart = cart.find((p) => p.id === parseInt(id));

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

        console.log(addedProduct);

        // add to cart
        cart = [...cart, { ...addedProduct }];
        console.log(cart);

        // save cart to localstorage
        Storage.saveCarts(cart);
        // Update cart shop
        this.setCartValue(cart);
        // add to cart item
        this.addCartItems(addedProduct);
      });
    });
  }

  addCartItems(cartItem) {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `<img class="cart-item-img" src=${cartItem.imageUrl} />
    <div class="cart-item-desc">
      <h4>${cartItem.title}</h4>
      <h5>${cartItem.price}</h5>
    </div>
    <div class="cart-item-conteoller">
      <i class="fas fa-chevron-up" data-id=${cartItem.id}></i>
      <p>${cartItem.quantity}</p>
      <i class="fas fa-chevron-down" data-id=${cartItem.id}></i>
      </div>
      <i class="far fa-trash-alt" data-id=${cartItem.id}></i>
  `;
    cartSection.appendChild(div);
  }

  setCartValue(cartItems) {
    let quantityOfCart = 0;
    const totalPrice = cartItems.reduce((acc, curr) => {
      quantityOfCart += curr.quantity;
      return acc + curr.quantity * curr.price;
    }, 0);
    quantityOfOrder.innerText = quantityOfCart;
    cartTotal.innerText = `The total price : ${totalPrice} $`;
  }

  setUpApp() {
    console.log(Storage.getCarts());
    cart = Storage.getCarts() || [];
    cart.forEach((element) => this.addCartItems(element));
    this.setCartValue(cart);
  }

  cartLogic() {
    clearCart.addEventListener("click", () => this.clearCart());
  }

  clearCart() {
    // remove :
    cart.forEach((e) => this.removeCartItem(e.id));
    // Remove child of item
    while (cartSection.children.length) {
      cartSection.removeChild(cartSection.children[0]);
    }
    // close modal
    closeModalFunction();
  }

  removeCartItem(id) {
    // Update Cart
    cart = cart.filter((cartItem) => cartItem.id !== id);
    // Update total price and cart items
    this.setCartValue(cart);
    // Update Storage
    Storage.saveCarts(cart);
    // Update add to cart button inner text
    this.getSingleButton(id);
  }

  getSingleButton(id) {
    const btn = buttons.find((btn) => btn.dataset.id == id);
    btn.innerText = "add to cart";
    btn.disabled = false;
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
  static getCarts() {
    return JSON.parse(localStorage.getItem("Carts"));
  }
}

document.addEventListener("DOMContentLoaded", (event) => {
  const products = new ProductsData();

  const ui = new UI();
  ui.setUpApp();
  ui.displayProduct(productsData);
  ui.getProductBtn();
  ui.cartLogic();
  Storage.saveProducts(productsData);
  // console.log(product.getProduct());
});
