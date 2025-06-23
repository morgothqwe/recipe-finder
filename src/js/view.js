class View {
  _parentEl = document.querySelector(".foodsie--main");
  _searchBox = document.querySelector(".foodsie--search");

  addHandlerFindFood(handler) {
    this._searchBox.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const value = this._searchBox.value;
        if (!value) return;

        handler(value);
        this._searchBox.value = "";
      }
    });
  }

  addHandlerBookmark(handler) {
    this._parentEl.addEventListener("click", (e) => {
      const bookmark = e.target.closest(".foodsie--bookmark");
      if (!bookmark) return;

      const foodCard = bookmark.closest(".foodsie--card");
      if (!foodCard) return;
      handler({
        recipeId: foodCard.dataset.id,
        bookmarkElement: bookmark,
      });
    });
  }

  _generateCardMarkup(el) {
    return `
      <div class="foodsie--card" data-id="${el.recipe_id}">
        <div class="foodsie--card--img">
          <span class="foodsie--bookmark" style="color: ${
            el.isBookmarked ? "#ee3333" : "#ececea"
          }">
            <i class="${
              el.isBookmarked ? "ph-fill" : "ph"
            } ph-bookmark-simple"></i>
          </span>
          <img src="${el.image_url}" alt="${el.title}" class="foodsie--img" />
        </div>
        <div class="foodsie--name">${el.title}</div>
      </div>
    `;
  }

  renderFood(recipe) {
    this._parentEl.innerHTML = "";

    document.querySelector(
      ".foodsie--found"
    ).textContent = `${recipe.length} recipes found`;

    const markup = recipe.map((el) => this._generateCardMarkup(el)).join("");
    this._parentEl.insertAdjacentHTML("beforeend", markup);
  }

  renderBookmark({ recipeId, bookmarkElement, isBookmarked }) {
    const icon = bookmarkElement.querySelector("i");
    if (!icon) return;
    icon.classList.toggle("ph-fill", isBookmarked);
    icon.classList.toggle("ph", !isBookmarked);
    bookmarkElement.style.color = isBookmarked ? "#ee3333" : "#ececea";
  }

  updateSingleCard(recipe) {
    const card = this._parentEl.querySelector(
      `[data-id="${recipe.recipe_id}"]`
    );
    if (!card) return;
    const markup = this._generateCardMarkup(recipe);
    card.outerHTML = markup;
  }
}

export default new View();
