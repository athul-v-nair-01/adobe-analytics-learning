let cart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart")) : []


function displayCartProduct() {
    let results = ""
    const cartProduct = document.getElementById("cart-product")
    cart.forEach((item) => {
        results += `
        <tr class="cart-item">
            <td></td>
            <td class="cart-image">
                <img src="${item.img.singleImage}" alt="" data-id=${item.id} class="cart-product-image">
                <i class="bi bi-x delete-cart" data-id=${item.id}></i>
            </td>
            <td>${item.name}</td>
            <td>$${item.price.newPrice.toFixed(2)}</td>
            <td>${item.quantity}</td>
            <td>$${(item.price.newPrice * item.quantity).toFixed(2)}</td>
        </tr>
        `
    })
    cartProduct.innerHTML = results
    removeCartItem()
}

displayCartProduct()

function cartProductRoute() {
    const images = document.querySelectorAll(".cart-product-image")
    images.forEach((image) => {
        image.addEventListener("click", (e) => {
            const imageId = e.target.dataset.id
            localStorage.setItem("productId", Number(imageId))
            window.location.href = "single-product.html"
        })
    })
}

cartProductRoute()


function removeCartItem() {

    const btnDeleteCart = document.querySelectorAll(".delete-cart");
    let cartItem = document.querySelector(".header-cart-count")

    let id = ''
    let removedItemName = ''
    btnDeleteCart.forEach((button) => {
        button.addEventListener("click", (e) => {
            id = e.target.dataset.id;
            let removedItem = cart.find(item => item.id === Number(id));
            removedItemName = removedItem.name
            cart = cart.filter((item) => item.id !== Number(id));
            displayCartProduct()
            localStorage.setItem("cart", JSON.stringify(cart))
            cartItem.innerHTML = cart.length
            saveCardValues()

            // Setting up data layer
            window.digitalData = {
                page: {
                    pageName: "Cart Page",
                    subSection: "Cart Table"
                },
                data:{
                    removed:{
                        id,
                        itemName,
                    }
                },
                event: "deleteCartItem"
            }
            // Dispatch custom event
            window.dispatchEvent(new CustomEvent("deleteCartItem"));
        });
    });
}


function saveCardValues() {
    const cartTotal = document.getElementById("cart-total")
    const subTotal = document.getElementById("subtotal")
    const fastCargo = document.getElementById("fast-cargo")
    const fastCargoPrice = 15
    let itemsTotal = 0

    cart.length > 0 && cart.map((item) => itemsTotal += item.price.newPrice * item.quantity)
    subTotal.innerHTML = `$${itemsTotal.toFixed(2)}`
    cartTotal.innerHTML = `$${itemsTotal.toFixed(2)}`
    fastCargo.addEventListener("change", (e) => {
        if (e.target.checked) {
            cartTotal.innerHTML = `$${(itemsTotal + fastCargoPrice).toFixed(2)}`
        } else {
            cartTotal.innerHTML = `$${itemsTotal.toFixed(2)}`
        }
    })
}


saveCardValues()