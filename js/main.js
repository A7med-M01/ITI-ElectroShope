bodyContent=''
searchInput = document.getElementById("searchTxt")
addEventListener("load",function(){
    xhr=new XMLHttpRequest();
    xhr.open("GET","https://6999cf8f9a9ce1d259f2c194.mockapi.io/Products/prods",true)
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4&&xhr.status==200){
            prod = JSON.parse(xhr.responseText)
            bodyContent =prod.map(function (e) {
                return `
                <div class="card" id="${e.id}" >
                    <img src="${e.image}" alt="product">
                    <h3>${e.name}</h3>
                    <div class="price">$${e.price}</div>
                    <input type="button" value="Add To Cart" class="addBtn" id="addBtn">
                    <input type="button" value="❤️" class="favBtn" id="favBtn">
                </div>
                `
            }).join("");
            document.getElementById("prod").innerHTML = bodyContent;
        }
    }

    xhr.send("")
})



function updateSearch(){
    filtered = prod.filter(function(p){
        return p.name.toLowerCase().includes(searchInput.value.toLowerCase());
    })
        filteredContent = filtered.map(function (e) {
        return `
        <div class="card" id="${e.id}" >
            <img src="${e.image}" alt="product">
            <h3>${e.name}</h3>
            <div class="price">$${e.price}</div>
            <input type="button" value="Add To Cart" class="addBtn">
            <input type="button" value="❤️" class="favBtn">
        </div>
        `;
    }).join("");
    
    document.getElementById("prod").innerHTML = filteredContent;
}
searchInput.addEventListener("input", updateSearch);

cartBtn = document.getElementById("addBtn")
favBtn = document.getElementById('favBtn')

cart=[]
fav =[]


productContainer = document.getElementById("prod");


productContainer.addEventListener("click", function(e) {

    if (e.target.classList.contains("addBtn")) {
    var card = e.target.closest(".card");
    var selectedProd = prod.find(function(p) {
        return p.id == card.id;
    });

    if (selectedProd) {
        var itemInCart = cart.find(function(item) {
            return item.id == selectedProd.id;
        });

        if (itemInCart) {
            itemInCart.quantity = (itemInCart.quantity || 1) + 1;
            alert("Increased " + selectedProd.name + " quantity to " + itemInCart.quantity);
        } else {
            var newCartItem = JSON.parse(JSON.stringify(selectedProd)); 
            newCartItem.quantity = 1;
            cart.push(newCartItem);
            alert("Added " + selectedProd.name + " to cart!");
        }
        localStorage.setItem("userCarts", JSON.stringify(cart));
    }
}


    if (e.target.classList.contains("favBtn")) {
        card = e.target.closest(".card"); 
        productId = card.id;
        isAlreadyFav = fav.some(item => item.id == productId);
        if(isAlreadyFav){
            alert("This item is already in your favorites!");
        }else{
            selectedProd = prod.find(function(p){
                return p.id == card.id
            })
            if(selectedProd){
                fav.push(selectedProd)
            }
            alert("Hello from favorite button! Product ID: " + productId);
            localStorage.setItem("userFavs", JSON.stringify(fav));
        }
    }


});
