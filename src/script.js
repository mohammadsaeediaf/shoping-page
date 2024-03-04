const cartBtn = document.querySelector(".cart-btn");
const cartModal = document.querySelector(".cart");
const backDrop = document.querySelector(".backdrop");
const closeModal = document.querySelector(".cart-item-confirm");
const productCenter = document.querySelector(".products-center");

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
      return (result = `<div class="product">
        <div class="img-container">
            <img src="./images/product-1.jpeg" class=${element.imageUrl} />
            </div>
            <div class="product-desc">
                <p class="product-price">$ ${element.price}</p>
                <p class="product-title">${element.title}</p>
            </div>
            <button class="btn add-to-cart ">
            <i class="fas fa-shopping-cart"></i>
                add to cart
            </button>
        </div>`);
    });
    productCenter.innerHTML = result;
  }
}

document.addEventListener("DOMContentLoaded", (event) => {
  const products = new ProductsData();

  const addProduct = new UI();
  addProduct.displayProduct(productsData);
  // console.log(product.getProduct());
});
