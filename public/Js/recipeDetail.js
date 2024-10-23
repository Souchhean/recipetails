
function getRecipeTitleFromURL() {
    const params = new URLSearchParams(window.location.search);
    const title = params.get('title'); // Get the 'title' from the URL
    console.log('Fetched title from URL:', title); // Log the fetched title
    return title;
}


function displayRecipeDetails(title) {
    fetch('/data/recipe.json')
        .then(response => response.json())
        .then(data => {
            const recipes = data; // Assuming data is the array of recipes
            const recipe = recipes.find(r => r.title === title); // Find the recipe by title

            
            if (recipe) {
                
                document.getElementById('recipe-title').textContent = recipe.title;
                document.getElementById('recipe-image').src = recipe.image;
                document.getElementById('recipe-description').textContent = recipe.description;
                document.getElementById('recipe-ingredients').textContent = recipe.ingredients.join(', ');
                document.getElementById('recipe-instructions').textContent = recipe.instructions;
            } else {
                console.error('Recipe not found for title:', title);
                document.getElementById('recipe-title').innerHTML = '<p>Recipe not found.</p>';
            }
        })
        .catch(error => console.error('Error fetching recipe data:', error));
}

// When the page loads, get the recipe title from the URL and display the recipe details
document.addEventListener('DOMContentLoaded', () => {
    const title = getRecipeTitleFromURL();
    if (title) {
        displayRecipeDetails(title);
    } else {
        console.error('No recipe title found in URL');
    }
});
