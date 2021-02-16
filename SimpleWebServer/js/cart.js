const cartWrapper = document.querySelector(".cart-wrapper");
const recieptWrapper = document.querySelector(".reciept-wrapper");
// add product to cart
window.addEventListener("click", function(event) {
    if (event.target.hasAttribute("data-cart")) {
        const card = event.target.closest(".card");

        const productInfo = {
            id: card.dataset.id,
            imgSrc: card.querySelector(".product-img").getAttribute("src"),
            title: card.querySelector(".item-title").innerText,
            weight: card.querySelector(".price__weight").innerText,
            price: card.querySelector(".price__currency").innerText,
            counter: card.querySelector("[data-counter]").innerText,
        };

        const itemInCart = cartWrapper.querySelector(
            `[data-id="${productInfo.id}"]`
        );

        if (itemInCart) {
            const counterElement = itemInCart.querySelector("[data-counter]");
            counterElement.innerText =
                parseInt(counterElement.innerText) + parseInt(productInfo.counter);
        } else {
            const cartItemHTML = `<div class="cart-item" data-id="${productInfo.id}">
				<div class="cart-item__top">
				  <div class="cart-item__img">
						<img src="${productInfo.imgSrc}" alt="">
					</div>
					<div class="cart-item__desc">
					  <div class="cart-item__title">${productInfo.title}</div>
						<div class="cart-item__weight">${productInfo.weight}</div>
						<!-- cart-item__details -->
						<div class="cart-item__details">
						<div class="items items--small counter-wrapper">
						  <button class="items__control" data-action="minus">-</button>
						  <div class="items__current" data-counter="">${productInfo.counter}</div>
							<button class="items__control" data-action="plus">+</button>
						</div>
						<div class="price">
							<div class="price__currency">${productInfo.price}</div>
						</div>
				</div>
			<!-- // cart-item__details -->
				</div>
			</div>
		</div>
    `;

            cartWrapper.insertAdjacentHTML("beforeend", cartItemHTML);
        }
        card.querySelector("[data-counter]").innerText = "1";

        toggleCartStatus();
    }
});

function toggleCartStatus() {
    const cartEmpty = document.querySelector("[data-cart-empty]");
    const cartTotal = document.querySelector(".cart-total");
    const orderForm = document.querySelector("#order-form");
    const deliveryCost = cartTotal.querySelector(".delivery-cost");

    if (cartWrapper.querySelectorAll(".cart-item").length > 0) {
        cartEmpty.classList.add("none");
        cartTotal.classList.remove("none");
        orderForm.classList.remove("none");
    } else {
        cartEmpty.classList.remove("none");
        cartTotal.classList.add("none");
        orderForm.classList.add("none");
    }

    //total price in cart
    let totalPrice = 0;

    cartWrapper.querySelectorAll(".cart-item").forEach(function(item) {
        const counter = item.querySelector("[data-counter]").innerText;
        const priceOneItem = item.querySelector(".price__currency").innerText;
        const price = parseInt(counter) * parseInt(priceOneItem);
        totalPrice += price;
    });
    const totalPriceElement = cartTotal.querySelector(".total-price");
    totalPriceElement.innerText = totalPrice;
    const deliveryCostElem = cartTotal.querySelector(".delivery-cost");

    if (totalPrice < 1000) {
        deliveryCost.classList.remove("free");
        deliveryCost.classList.add("notfree");
        deliveryCostElem.innerText = "300";
        totalPriceElement.innerText = totalPrice + 300;
    } else {
        deliveryCost.classList.remove("notfree");
        deliveryCost.classList.add("free");
        deliveryCostElem.innerText = "free";
    }
}