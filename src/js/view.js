class View {
  _parentEl = document.querySelector(".foodsie--main");
  _searchBox = document.querySelector(".foodsie--search");
  _paginationEl = document.querySelector(".foodsie--pagination");

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

  addHandlerPagination(handler) {
    this._paginationEl.addEventListener("click", (e) => {
      const btn = e.target.closest(".pagination-btn");
      if (!btn) return;
      const page = parseInt(btn.dataset.page, 10);
      handler(page);
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

  renderFood(recipes, totalRecipes) {
    this._parentEl.innerHTML = "";

    document.querySelector(
      ".foodsie--found"
    ).textContent = `${totalRecipes} recipes found`;

    const markup = recipes.map((el) => this._generateCardMarkup(el)).join("");
    this._parentEl.insertAdjacentHTML("beforeend", markup);
  }

  renderPagination(currentPage, totalPages) {
    if (!this._paginationEl) return;

    let markup = "";
    if (totalPages <= 1) {
      this._paginationEl.innerHTML = "";
      return;
    }

    // Previous button
    markup += `
      <button class="pagination-btn" data-page="${currentPage - 1}" ${
      currentPage === 1 ? "disabled" : ""
    }>
        Previous
      </button>
    `;

    // Page numbers (show limited range, e.g., current ± 2)
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);
    for (let i = startPage; i <= endPage; i++) {
      markup += `
        <button class="pagination-btn ${
          i === currentPage ? "active" : ""
        }" data-page="${i}">
          ${i}
        </button>
      `;
    }

    // Next button
    markup += `
      <button class="pagination-btn" data-page="${currentPage + 1}" ${
      currentPage === totalPages ? "disabled" : ""
    }>
        Next
      </button>
    `;

    this._paginationEl.innerHTML = markup;
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
