savedCart = localStorage.getItem("userCarts");

cart = savedCart ? JSON.parse(savedCart) : [];
Show()
function Show(){
    if (cart.length === 0) {
        document.getElementById("card-product").innerHTML = "<h2>No Cart yet!</h2>";
    } else {
    cartHTML = cart.map(function(item){
            return `
        <div class="card" id="${item.id}">
            <img src="${item.image}" alt="product">
            <h3>${item.name}</h3>
            <input type="button" value="-" class="minus" id="minus">
            <span class="qty" id="${item.id}">${item.quantity}</span>
            <input type="button" value="+" class="plus" id="plus">
            <p>SubPrice: $${item.price * item.quantity}</p>
            <input type="button" value="Remove" class="removeBtn" id="removeBtn">

        </div>
    `
                }).join("");
        document.getElementById("card-product").innerHTML = cartHTML;
    }
    updateGrandTotal()
}


cartProduct = document.getElementById("card-product")

cartProduct.addEventListener("click",function(e){
    if(e.target.classList.contains("removeBtn")){
        var card = e.target.closest(".card")
        cart = cart.filter(function(item){
            return item.id != card.id
        })
        localStorage.setItem("userCarts", JSON.stringify(cart));
        card.remove();
        if (cart.length==0){
            document.getElementById("card-product").innerHTML = "<h2>No Cart yet!</h2>";
        }
        updateGrandTotal()

    }
    if(e.target.classList.contains("plus")){
        var card = e.target.closest(".card")
        plus = cart.find(function(item){
            return item.id == card.id
        })
        if(plus){
            plus.quantity+=1
            localStorage.setItem("userCarts", JSON.stringify(cart));
            Show()

        }
    }
    if(e.target.classList.contains("minus")){
        var card = e.target.closest(".card")
        minus = cart.find(function(item){
            return item.id == card.id
        })
        if(minus&&minus.quantity>1){
            minus.quantity-=1
            localStorage.setItem("userCarts", JSON.stringify(cart));
            Show()
        }
    }
})


function updateGrandTotal() {
    total = cart.reduce(function(sum, item) {
        return sum + (item.price * item.quantity);
    }, 0);
    totalElement = document.getElementById("total-price");
    if (totalElement) {
        totalElement.innerText = `Total: $${total.toFixed(2)}`;
    }
}

