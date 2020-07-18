export default class Likes {
	constructor() {
		this.likes = [];
	}

	addLike(id, title, author, img) {
		const like = { id, title, author, img };

		this.likes.push(like);
		return like;
	}

	deleteLike(id) {
		const index = this.likes.findIndex((el) => el.id === id);
		this.likes.splice(index, 1);
	}

	isLiked(id) {
		// it returns -1 if not found. anything other than -1 will be true
		return this.likes.findIndex((el) => el.id === id) !== -1;
	}

	getNumLikes() {
		return this.likes.length;
	}
}
