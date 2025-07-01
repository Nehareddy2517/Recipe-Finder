document.getElementById("search-button").addEventListener("click", fetchRecipes);

function fetchRecipes() {
  const query = document.getElementById("search-input").value.trim();
  const recipesContainer = document.getElementById("recipes");
  recipesContainer.innerHTML = "";

  if (query === "") {
    alert("Please enter an ingredient.");
    return;
  }

  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.meals) {
        data.meals.forEach((meal) => {
          const card = document.createElement("div");
          card.className = "recipe-card";
          card.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <div class="recipe-title">${meal.strMeal}</div>
            <a class="recipe-link" href="https://www.themealdb.com/meal.php?c=${meal.idMeal}" target="_blank">View Recipe</a>
          `;
          recipesContainer.appendChild(card);
        });
      } else {
        recipesContainer.innerHTML = `<p>No recipes found for "<b>${query}</b>" 😢</p>`;
      }
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      recipesContainer.innerHTML = "<p>Something went wrong. Try again later.</p>";
    });
}
