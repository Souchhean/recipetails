document.addEventListener('DOMContentLoaded', () => {
    // Fetch all recipes and display them
    fetch('/api/recipes')
        .then(response => response.json())
        .then(data => {
            const recipeList = document.getElementById('recipe-list');
            data.forEach(recipe => {
                const recipeCard = `
                    <div class="col-md-4">
                        <div class="card mb-4">
                            <div class="card-body">
                                <h5 class="card-title">${recipe.title}</h5>
                                <p class="card-text"><strong>Ingredients:</strong> ${recipe.ingredients.join(', ')}</p>
                                <p class="card-text"><strong>Instructions:</strong> ${recipe.instructions.join(' ')}</p>
                            </div>
                        </div>
                    </div>
                `;
                recipeList.innerHTML += recipeCard;
            });
        })
        .catch(error => console.error('Error fetching recipes:', error));

    // Handle recipe form submission
    const form = document.getElementById('recipe-form');
    if (form) { // Check if form exists
        form.addEventListener('submit', event => {
            event.preventDefault();
            const formData = new FormData(form);
            fetch('/api/recipes', {
                method: 'POST',
                body: new URLSearchParams(formData)
            })
                .then(() => {
                    alert('Recipe added!');
                    form.reset();
                    location.reload(); // Refresh the page to see new recipe
                })
                .catch(error => console.error('Error adding recipe:', error));
        });
    }

    // Function to fetch favorite recipes and display them
    function fetchFavoriteRecipes() {
        fetch('/data/recipe.json') // Ensure this path is correct
            .then(response => response.json())
            .then(data => {
                const favoriteRecipes = data.filter(recipe => recipe.isFavorite); // Modify this line based on your criteria
                const favRecipesContainer = document.querySelector('.fav-recipes .row');
                favRecipesContainer.innerHTML = ''; // Clear the container

                favoriteRecipes.forEach(recipe => {
                    const recipeCard = `
                        <div class="col-md-4">
                            <div class="card">
                                <img src="${recipe.image}" class="card-img-top" alt="${recipe.title}">
                                <div class="card-body">
                                    <h5 class="card-title">${recipe.title}</h5>
                                    <p class="card-text">${recipe.description || 'No description available.'}</p>
                                    <a href="recipe-Detail.html?title=${encodeURIComponent(recipe.title)}" class="btn btn-primary">View Recipe</a>
                                </div>
                            </div>
                        </div>
                    `;
                    favRecipesContainer.insertAdjacentHTML('beforeend', recipeCard);
                });
            })
            .catch(error => console.error('Error fetching favorite recipes:', error));
    }

    // Call the function to fetch favorite recipes
    fetchFavoriteRecipes();
});
