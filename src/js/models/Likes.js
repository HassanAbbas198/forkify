export default class Likes {
	constructor() {
		this.likes = [];
	}

	addLike(id, title, author, img) {
		const like = { id, title, author, img };

		this.likes.push(like);

		this.persistData();

		return like;
	}

	deleteLike(id) {
		const index = this.likes.findIndex((el) => el.id === id);
		this.likes.splice(index, 1);

		this.persistData();
	}

	isLiked(id) {
		// it returns -1 if not found. anything other than -1 will be true
		return this.likes.findIndex((el) => el.id === id) !== -1;
	}

	getNumLikes() {
		return this.likes.length;
	}

	// persist data on localStorage whenever we update the likes array
	persistData() {
		localStorage.setItem('likes', JSON.stringify(this.likes));
	}

	readStorage() {
		const storage = JSON.parse(localStorage.getItem('likes'));
		// restoring our likes from the localStorage
		if (storage) {
			this.likes = storage;
		}
	}
}
