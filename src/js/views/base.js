export const elements = {
	searchForm: document.querySelector('.search'),
	searchRes: document.querySelector('.results'),
	searchInput: document.querySelector('.search__field'),
	searchResultList: document.querySelector('.results__list'),
	searchResPages: document.querySelector('.results__pages'),

	recipe: document.querySelector('.recipe'),

	shoppingList: document.querySelector('.shopping__list'),
};

export const renderLoader = (parent) => {
	const loader = `
	<div class="loader">
		<svg>
				<use href="img/icons.svg#icon-cw"></use>
		</svg>
	</div>
	`;

	parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
	const loader = document.querySelector('.loader');
	if (loader) {
		loader.parentElement.removeChild(loader);
	}
};
