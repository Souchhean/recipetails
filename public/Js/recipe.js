
function getCategoryFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('category');
}


function displayRecipesForCategory(category) {
    
    fetch('/data/recipe.json')
        .then(response => response.json())
        .then(data => {
            const recipes = data; 
            const recipeList = document.getElementById('recipe-list'); 
            const categoryTitle = document.getElementById('category-title');

         
            categoryTitle.textContent = `${category.charAt(0).toUpperCase() + category.slice(1)} Recipes`;

            
            recipeList.innerHTML = '';

            
            const filteredRecipes = recipes.filter(recipe => recipe.category.toLowerCase() === category.toLowerCase());

            
            if (filteredRecipes.length === 0) {
                recipeList.innerHTML = '<p>No recipes found for this category.</p>';
                return;
            }

            
            filteredRecipes.forEach(recipe => {
                const recipeCard = document.createElement('div');
                recipeCard.classList.add('col-md-4', 'mb-4');

                
                recipeCard.innerHTML = `
                    <div class="card" style="width: 18rem;">
                        <img src="${recipe.image}" class="card-img-top" alt="${recipe.title}">
                        <div class="card-body">
                            <h5 class="card-title">${recipe.title}</h5>
                            <p class="card-text">${recipe.description}</p>
                            <a href="recipe-detail.html?title=${encodeURIComponent(recipe.title)}" class="btn btn-primary">View Recipe</a>
                        </div>
                    </div>
                `;
                recipeList.appendChild(recipeCard);
            });
        })
        .catch(error => console.error('Error fetching the recipe data:', error));
}


document.addEventListener('DOMContentLoaded', () => {
    const category = getCategoryFromURL();
    if (category) {
        displayRecipesForCategory(category);
    } else {
        console.error('No category found in URL');
    }
});
