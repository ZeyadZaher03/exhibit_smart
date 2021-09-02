const favorites = [
  {
    itemName: "chair",
    stars: 4,
    itemImg:
      "https://www.ikea.com/eg/en/images/products/millberget-swivel-chair-bomstad-black__0724719_pe734602_s5.jpg?f=s",
    itemPrice: 50.0,
  },
  {
    itemName: "chair",
    stars: 4,
    itemImg:
      "https://www.ikea.com/eg/en/images/products/millberget-swivel-chair-bomstad-black__0724719_pe734602_s5.jpg?f=s",
    itemPrice: 50.0,
  },
  {
    itemName: "Lamp",
    stars: 3,
    itemImg:
      "https://www.ikea.com/eg/en/images/products/millberget-swivel-chair-bomstad-black__0724719_pe734602_s5.jpg?f=s",
    itemPrice: 50.0,
  },
  {
    itemName: "hair",
    stars: 1,
    itemImg:
      "https://www.ikea.com/eg/en/images/products/millberget-swivel-chair-bomstad-black__0724719_pe734602_s5.jpg?f=s",
    itemPrice: 30.0,
  },
];

const favHandler = () => {
  const createFavItem = (favData) => {
    // create
    const favItem = document.createElement("div");

    const favItemIconContainer = document.createElement("div");
    const favItemIcon = document.createElement("i");

    const favItemImgContainer = document.createElement("div");
    const favItemImgShade = document.createElement("div");
    const favItemImg = document.createElement("img");

    const favDetails = document.createElement("div");
    const favDetailsFirstRow = document.createElement("div");
    const favName = document.createElement("p");
    const favStarsContainer = document.createElement("div");

    const favDetailsSecRow = document.createElement("div");
    const favPriceMessage = document.createElement("p");
    const favAddToCart = document.createElement("button");
    const favPrice = document.createElement("p");

    // arrange
    favItem.appendChild(favItemIconContainer);

    favItemIconContainer.appendChild(favItemIcon);

    favItem.appendChild(favItemImgContainer);
    favItemImgContainer.appendChild(favItemImgShade);
    favItemImgContainer.appendChild(favItemImg);

    favItem.appendChild(favDetails);

    favDetails.appendChild(favDetailsFirstRow);
    favDetailsFirstRow.appendChild(favName);
    favDetailsFirstRow.appendChild(favStarsContainer);

    favDetails.appendChild(favDetailsSecRow);
    favDetailsSecRow.appendChild(favPriceMessage);
    favDetailsSecRow.appendChild(favAddToCart);
    favDetailsSecRow.appendChild(favPrice);

    // classes
    favItem.classList.add("fav-item");

    favItemIconContainer.classList.add("fav-item-icon");
    favItemIcon.classList.add("fas", "fa-star");

    favItemImgContainer.classList.add("fav-img-container");
    favItemImgShade.classList.add("fav-img-shade");
    favItemImg.classList.add("fav-img");

    favDetails.classList.add("fav-details");

    favDetailsFirstRow.classList.add("fav-details-name-row");
    favName.classList.add("fav-item-name");
    favStarsContainer.classList.add("fav-item-stars");

    favDetailsSecRow.classList.add("fav-details-name-price");
    favAddToCart.classList.add("fav-add-to-cart-button");
    favPrice.classList.add("fav-item-price");

    // content
    favItemImg.src = favData.itemImg;
    favName.innerHTML = favData.itemName;
    favPriceMessage.innerHTML = "Price Per Unit";
    favAddToCart.innerHTML = "Add To Cart";
    favPrice.innerHTML = `Start From ${favData.itemPrice}$`;

    //stars
    const starsHandler = (num) => {
      // favStarsContainer.
      const numOfEmptyStars = 5 - num;
      for (i = 0; i < num; i++) {
        const starIcon = document.createElement("i")
        starIcon.classList.add("fas","fa-star");
        favStarsContainer.appendChild(starIcon);
      }
      for (i = 0; i < numOfEmptyStars; i++) {
        const starIcon = document.createElement("i")
        starIcon.classList.add("far","fa-star");
        favStarsContainer.appendChild(starIcon);
      }
    };
    starsHandler(favData.stars);
    return favItem;
  };


  const favContainer = document.querySelector(".fav-items-container") 
  
  favorites.forEach((fav)=>favContainer.appendChild(createFavItem(fav)))
  // createFavItem();
};
{
  /* <div class="fav-item">
  <div class="fav-item-icon">
    <i class="fas fa-star"></i>
  </div>
  <div class="fav-img-container">
    <div class="fav-img-shade"></div>
    <img
      src="https://www.ikea.com/eg/en/images/products/millberget-swivel-chair-bomstad-black__0724719_pe734602_s5.jpg?f=s"
      class="fav-img"
    />
  </div>
  <div class="fav-details">
    <div class="fav-details-name-row">
      <p class="fav-item-name">Chair</p>
      <div class="fav-item-stars">
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="far fa-star"></i>
      </div>
    </div>
    <div class="fav-details-name-price">
      <p>Price Per Unit</p>
      <button class="fav-add-to-cart-button">Add To Cart</button>
      <p class="fav-item-price">Start From 50$</p>
    </div>
  </div>
</div>; */
}

favHandler();
