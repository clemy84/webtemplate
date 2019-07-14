// show cart

(function() {
  const cartInfo = document.getElementById("cart-info");
  const cart = document.getElementById("cart");

  cartInfo.addEventListener("click", function() {
    cart.classList.toggle("show-cart");
  });
})();

// add items to the cart

(function() {
  const cartBtn = document.querySelectorAll(".store-item-icon");

  cartBtn.forEach(function(btn) {
    btn.addEventListener("click", function(event) {
      if (event.target.parentElement.classList.contains("store-item-icon")) {
        let fullPath = event.target.parentElement.previousElementSibling.src;
        let pos = fullPath.indexOf("img") + 3;
        let partPath = fullPath.slice(pos);

        const item = {};
        item.img = `img-cart${partPath}`;

        let name =
          event.target.parentElement.parentElement.nextElementSibling
            .children[0].children[0].textContent;
        item.name = name;
        let price =
          event.target.parentElement.parentElement.nextElementSibling
            .children[0].children[1].textContent;

        let finalPrice = price.slice(1).trim();

        item.price = finalPrice;

        const cartItem = document.createElement("div");
        cartItem.classList.add(
          "cart-item",
          "d-flex",
          "justify-content-between",
          "text-capitalize",
          "my-3"
        );

        cartItem.innerHTML = `
  <img src="${item.img}" class="img-fluid rounded-circle" id="item-img" alt="">
  <div class="item-text">
    <p id="cart-item-title" class="font-weight-bold mb-0">${item.name}</p>
    <span>£</span>
    <span id="cart-item-price" class="cart-item-price" class="mb-0">${
      item.price
    }</span>
  </div>
  <a href="#" id='cart-item-remove' class="cart-item-remove">
    <i class="fas fa-trash"></i>
  </a>
</div>`;

        // select cart

        const cart = document.getElementById("cart");
        const total = document.querySelector(".cart-total-container");

        cart.insertBefore(cartItem, total);

        let itemImg = event.target.parentElement.previousElementSibling;
        itemImg.classList.add("opacity");

        showTotals();
      }
    });
  });
  // show totals
  function showTotals() {
    const total = [];
    const items = document.querySelectorAll(".cart-item-price");

    items.forEach(function(item) {
      total.push(parseFloat(item.textContent));
    });

    const totalMoney = total.reduce(function(total, item) {
      total += item;
      return total;
    }, 0);

    const finalMoney = totalMoney.toFixed(2);
    document.getElementById("cart-total").textContent = finalMoney;
    document.querySelector(".item-total").textContent = finalMoney;
    document.getElementById("item-count").textContent = total.length;
  }
})();

// filter btns
(function() {
  // selct all buttons
  const filterBtn = document.querySelectorAll(".filter-btn");

  filterBtn.forEach(function(btn) {
    btn.addEventListener("click", function(event) {
      // prevent default action
      event.preventDefault();
      const value = event.target.dataset.filter;
      // console.log(value);
      const items = document.querySelectorAll(".store-item");

      items.forEach(function(item) {
        if (value === "all") {
          item.style.display = "block";
        } else {
          if (item.classList.contains(value)) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }
        }
      });
    });
  });
})();

// filter buttons
(function() {
  // select all buttons
  const filterBtn = document.querySelectorAll(".filter-btn");
  filterBtn.forEach(function(btn) {
    btn.addEventListener("click", function(event) {
      // prevnt default action
      event.preventDefault();
      const value = event.target.dataset.filter;
      const items = document.querySelectorAll(".store-item");

      items.forEach(function(item) {
        if (value === "all") {
          item.style.display = "block";
        } else {
          if (item.classList.contains(value)) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
            console.log(value);
          }
        }
      });
    });
  });
})();

// search input
(function() {})();
// lightbox

(function() {
  // all images
  let imageList = [];
  let counter = 0;

  const images = document.querySelectorAll(".store-img");
  const container = document.querySelector(".lightbox-container");
  const item = document.querySelector(".lightbox-item");
  const closeIcon = document.querySelector(".lightbox-close");
  const btnLeft = document.querySelector(".btnLeft");
  const btnRight = document.querySelector(".btnRight");

  // add all images to the array
  images.forEach(function(img) {
    imageList.push(img.src);
  });

  // open modal
  images.forEach(function(img) {
    img.addEventListener("click", function() {
      // show modal
      container.classList.add("show");
      // get source
      let src = event.target.src;

      counter = imageList.indexOf(src);
      // show modal with an image
      item.style.backgroundImage = `url(${src})`;
    });
  });

  // close model
  closeIcon.addEventListener("click", function() {
    container.classList.remove("show");
  });
  // left button
  btnLeft.addEventListener("click", function() {
    counter--;
    if (counter < 0) {
      counter = imageList.length - 1;
    }
    item.style.backgroundImage = `url(${imageList[counter]})`;
  });
  // button right
  btnRight.addEventListener("click", function() {
    counter++;
    if (counter > imageList.length - 1) {
      counter = 0;
    }
    item.style.backgroundImage = `url(${imageList[counter]})`;
  });
})();
