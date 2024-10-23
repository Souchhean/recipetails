const express = require('express');
const fs = require('fs');
const path = require('path');
const helmet = require('helmet');

const app = express();

app.use(express.static('public')); // Serve static files from the public folder
app.use(express.json());

// Helmet configuration for security
app.use(helmet({
    contentSecurityPolicy: {
        useDefaults: true,
        directives: {
            'default-src': ["'self'"],
            'img-src': ["'self'", "data:"],
            'font-src': ["'self'", "https://fonts.gstatic.com"],
            'style-src': ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            'script-src': ["'self'", "'unsafe-inline'"]
        }
    }
}));

// Update the path for the recipe JSON file
const recipeFilePath = path.join(__dirname, 'public', 'data', 'recipe.json');

// Route to fetch all categories
app.get('/api/categories', (req, res) => {
    fs.readFile(path.join(__dirname, 'public', 'data', 'category.json'), 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ error: 'Error reading categories file' });
        } else {
            res.json(JSON.parse(data));
        }
    });
});

// Route to fetch recipes by category
app.get('/api/recipes/category/:category', (req, res) => {
    const category = req.params.category;

    fs.readFile(recipeFilePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ error: 'Error reading recipes file' });
        } else {
            const recipes = JSON.parse(data);
            const filteredRecipes = recipes.filter(recipe => recipe.category.toLowerCase() === category.toLowerCase());

            if (filteredRecipes.length > 0) {
                res.json(filteredRecipes);
            } else {
                res.status(404).json({ error: 'No recipes found for this category' });
            }
        }
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
