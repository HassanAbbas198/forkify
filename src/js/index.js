import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';

import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import { elements, renderLoader, clearLoader } from './views/base';

const state = {};

// SEARCH CONTROLLER

const controlSearch = async () => {
	// Get the query from searchView
	const query = searchView.getInput();

	if (query) {
		// creating a new search object and add it to the state
		state.search = new Search(query);
	}

	// Prepare UI for the results
	searchView.clearInput();
	searchView.clearResults();
	renderLoader(elements.searchRes);

	try {
		// Search for recipes
		await state.search.getResults();

		// Render results on UI
		clearLoader();
		searchView.renderResults(state.search.result);
	} catch (error) {
		alert('Something went wrong!');
		clearLoader();
	}
};

elements.searchForm.addEventListener('submit', (e) => {
	e.preventDefault();
	controlSearch();
});

elements.searchResPages.addEventListener('click', (e) => {
	const btn = e.target.closest('.btn-inline');
	if (btn) {
		const goToPage = parseInt(btn.dataset.goto, 10);
		searchView.clearResults();
		searchView.renderResults(state.search.result, goToPage);
	}
});

// RECIPE CONTROLLER

const controlRecipe = async () => {
	// getting the recipe id from the URL
	const id = window.location.hash.replace('#', '');

	if (id) {
		renderLoader(elements.recipe);
		recipeView.clearRecipe();

		if (state.search) {
			searchView.highLightSelected(id);
		}

		// creating a new recipe object and add it to the state
		state.recipe = new Recipe(id);
		try {
			// getting recipe data and parse ingredients
			await state.recipe.getRecipe();
			await state.recipe.parseIngredients();

			// calculate time and servings
			state.recipe.calcTime();
			state.recipe.calcServings();

			clearLoader();
			recipeView.renderRecipe(state.recipe);
		} catch (error) {
			alert('Error processing the recipe');
		}
	}
};

// LIST CONTROLLER

const controlList = () => {
	if (!state.list) {
		state.list = new List();
	}

	state.recipe.ingredients.forEach((el) => {
		const item = state.list.addItem(el.count, el.unit, el.ingredient);
		listView.renderItem(item);
	});
};

elements.shoppingList.addEventListener('click', (e) => {
	const id = e.target.closest('.shopping__item').dataset.itemid;
	if (e.target.matches('.shopping__delete, .shopping__delete *')) {
		state.list.deleteItem(id);
		listView.deleteItem(id);
	} else if (e.target.matches('.shopping__count-value')) {
		const value = parseFloat(e.target.value, 10);
		state.list.updateCount(id, value);
	}
});

['hashchange', 'load'].forEach((event) =>
	window.addEventListener(event, controlRecipe)
);

/* same as: 
	window.addEventListener('hashchange', controlRecipe);
 	window.addEventListener('load', controlRecipe); 
*/

elements.recipe.addEventListener('click', (e) => {
	// if btn-decrease OR btn-decrease * (* == any child)
	if (
		e.target.matches('.btn-decrease, .btn-decrease *') &&
		state.recipe.servings > 1
	) {
		state.recipe.updateServings('dec');
		recipeView.updateServingsIngredients(state.recipe);
	} else if (e.target.matches('.btn-increase, .btn-increase *')) {
		state.recipe.updateServings('inc');
		recipeView.updateServingsIngredients(state.recipe);
	} else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
		controlList();
	}
});
