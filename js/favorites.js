savedFavs = localStorage.getItem("userFavs");

fav = savedFavs ? JSON.parse(savedFavs) : [];

if (fav.length === 0) {
    document.getElementById("small-container").innerHTML = "<h2>No favorites yet!</h2>";
} else {
    favHTML = fav.map(function(e){
        return `
                <div class="card" id="${e.id}" >
                    <img src="${e.image}" alt="product">
                    <h3>${e.name}</h3>
                    <div class="price">$${e.price}</div>
                    <input type="button" value="Remove" class="removeBtn" id="removeBtn">
                    
                </div>
                `
            }).join("");
    
    document.getElementById("small-container").innerHTML = favHTML;
}


favProduct = document.getElementById("small-container")

favProduct.addEventListener("click",function(e){
    if(e.target.classList.contains("removeBtn")){
        var card = e.target.closest(".card")
        favProductId = card.id
        fav = fav.filter(function(item){
            return item.id != card.id
        })
        localStorage.setItem("userFavs", JSON.stringify(fav));
        card.remove();
        if (fav.length==0){
            document.getElementById("small-container").innerHTML = "<h2>No favorites yet!</h2>";
        }
    }
})