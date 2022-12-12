/* when you click on add to cart, takes the title, price and adds to cart
if you click on add to cart again, needs to increase quantity
total price needs to be updated
appropriate divs need to be added to cart */

//if document is still loading, add event listener to listen for domcontentloaded

//if page is done loading, will run ready function

//this means that page will be fully loaded, so code will work



if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {


    const removeCartItemButtons = document.getElementsByClassName('cart__item-remove')

    for (let i = 0; i < removeCartItemButtons.length; i++) {
        let button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    let quantityInputs = document.getElementsByClassName('cart-quantity')
    for (let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    let addToCartButtons = document.getElementsByClassName('shop__item-button')
    for (let i = 0; i < addToCartButtons.length; i++) {
        let button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    alert('Thank you for checking out this project. A checkout will be added in version 2!')
    let cartItems = document.getElementsByClassName('cart__items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(event) {
    let buttonClicked = event.target
            buttonClicked.parentElement.parentElement.remove()
            updateCartTotal()
}

function quantityChanged(event) {
    let input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    let button = event.target
    let shopItem = button.parentElement.parentElement
    let title = shopItem.getElementsByClassName('shop__item-title')[0].innerText
    let price = shopItem.getElementsByClassName('shop__item-price')[0].innerText
    let imageSrc = shopItem.getElementsByClassName('shop__item-image')[0].src
    addItemToCart(title, price, imageSrc)
}

function addItemToCart(title, price, imageSrc) {
    let cartRow = document.createElement('div')
    cartRow.classList.add('cart__item-container')
    cartRow.innerText = title
    let cartItems = document.getElementsByClassName('cart__items')[0]
    let cartItemsNames = cartItems.getElementsByClassName('cart__item-details')
    for(let i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText === title) {
            alert('This item is already added to the cart. You can adjust the quantity in the cart section below.')
            return
        }
    }
    let cartRowContents = `
        <div class="cart__item-image_container">
            <img class="cart__item-image" src="${imageSrc}">
        </div>
        <div class="cart__item-details">
            ${title}
        </div>
        <div class="cart__item-price">
            ${price}
        </div>
        <div class="cart__item-quantity">
            <input type="number" class="cart-quantity" id="cart-quantity" name="cart-quantity" value="1"><br>
            <button class="cart__item-remove" type="button">Remove</button>
        </div>
    `
    cartRow.innerHTML = cartRowContents
    cartItems.appendChild(cartRow)
    cartRow.getElementsByClassName('cart__item-remove')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged)
    updateCartTotal()
}



const updateCartTotal = () => {
    let cartItemContainer = document.getElementsByClassName('cart__items')[0]
    let cartRows = cartItemContainer.getElementsByClassName('cart__item-container')
    let total = 0
    for (let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i]
        let priceElement = cartRow.getElementsByClassName('cart__item-price')[0]
        let quantityElement = cartRow.getElementsByClassName('cart-quantity')[0]
        let price = parseFloat(priceElement.innerText.replace('£', ''))
        let quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart__total-sum')[0].innerText = '£' + total
}