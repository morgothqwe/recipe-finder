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

  _generateCardMarkup(el) {
    return `
    <div class="foodsie--card" data-id="${el.recipe_id}">
      <div class="foodsie--card--img">
        <span class="foodsie--bookmark"></span>
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
}

export default new View();
