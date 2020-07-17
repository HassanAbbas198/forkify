import uniqid from 'uniqid';

export default class List {
	constructor() {
		this.items = [];
	}

	addItem(count, unit, ingredient) {
		// es6 shorthand syntax
		const item = {
			id: uniqid(),
			count,
			unit,
			ingredient,
		};
		this.items.push(item);
		return item;
	}

	deleteItem(id) {
		const index = this.items.findIndex((el) => el.id === id);

		// splice(index, how many element)
		this.items.splice(index, 1);
	}

	updateCount(id, newCount) {
		this.items.find((el) => el.id === id).count = newCount;
	}
}
