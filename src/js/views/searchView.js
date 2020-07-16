import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
	elements.searchInput.value = '';
};

export const clearResults = () => {
	elements.searchResultList.innerHTML = '';
};

const limitRecipeTitle = (title, limit = 17) => {
	const newTitle = [];
	if (title.length > limit) {
		title.split(' ').reduce((acc, cur) => {
			if (acc + cur.length <= limit) {
				newTitle.push(cur);
			}
			return acc + cur.length;
		}, 0);

		// join is the opposite of split
		return `${newTitle.join(' ')}...`;
	}
	return title;
};

const renderRecipe = (recipe) => {
	const html = `
  <li>
    <a class="results__link" href="#${recipe.recipe_id}">
        <figure class="results__fig">
            <img src="${recipe.image_url}" alt="${recipe.title}">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
            <p class="results__author">${recipe.publisher}</p>
        </div>
    </a>
  </li>`;

	elements.searchResultList.insertAdjacentHTML('beforeend', html);
};
export const renderResults = (recipes) => {
	// looping over the recipess and calling the renderRecipe in every iteration
	recipes.forEach(renderRecipe);

	// recipes.forEach((el) => {
	//   renderRecipe(el);
	// });
};
