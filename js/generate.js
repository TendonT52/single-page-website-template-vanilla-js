export function CreateMainBlock(block) {
	const main = document.createElement("div");
	main.classList.add("main-block");

	const name = document.createElement("div");
	const h3 = document.createElement("h3");
	name.draggable = true;
	name.classList.add("top-name");
	h3.insertAdjacentText("beforeend", block.name);
	name.appendChild(h3);
	main.appendChild(name);

	const like = document.createElement("div");
	like.classList.add("like");
	like.classList.add("mid-block");
	block.like.forEach((element) => {
		const item = document.createElement("div");
		item.classList.add("sub-block");
		item.draggable = true;
		item.insertAdjacentText("beforeend", element);
		like.appendChild(item)
	});
	main.appendChild(like);

	const addLike = document.createElement("div");
	addLike.classList.add("add-sub-block");
	addLike.insertAdjacentText("beforeend", "+");
	like.appendChild(addLike);

	const dislike = document.createElement("div");
	dislike.classList.add("dislike");
	dislike.classList.add("mid-block");
	block.dislike.forEach((element) => {
		const item = document.createElement("div");
		item.classList.add("sub-block");
		item.draggable = true;
		item.insertAdjacentText("beforeend", element);
		dislike.appendChild(item)
	});
	main.appendChild(dislike);

	const addUnLike = document.createElement("div");
	addUnLike.classList.add("add-sub-block");
	addUnLike.insertAdjacentText("beforeend", "+");
	dislike.appendChild(addUnLike);

	return main;
}
