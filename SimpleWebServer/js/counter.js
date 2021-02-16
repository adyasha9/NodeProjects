window.addEventListener("click", function (event) {
    if (event.target.hasAttribute("data-action")) {
      const counterWrapper = event.target.closest(".counter-wrapper");
      const counter = counterWrapper.querySelector("[data-counter]");
  
      if (event.target.dataset.action === "plus") {
        counter.innerText = ++counter.innerText;
        if (event.target.closest(".cart-wrapper")) {
          toggleCartStatus();
        }
      } else if (event.target.dataset.action === "minus") {
        //checked where product
        if (event.target.closest(".cart-wrapper")) {
          if (parseInt(counter.innerText) > 1) {
            counter.innerText = --counter.innerText;
          } else {
            //delete product from cart
            event.target.closest(".cart-item").remove();
          }
          //count total price
          toggleCartStatus();
        } else {
          if (parseInt(counter.innerText) > 1) {
            counter.innerText = --counter.innerText;
          }
        }
      }
    }
  });