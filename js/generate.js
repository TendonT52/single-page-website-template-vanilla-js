export function CreateMainBlock() {
	const main = document.createElement("div");
	main.classList.add("main-block");

	const name = document.createElement("div");
	const h3 = document.createElement("h3");
	name.draggable = true;
	name.classList.add("top-name");
	h3.insertAdjacentText("beforeend", "Name");
	name.appendChild(h3);
	main.appendChild(name);

	const like = document.createElement("div");
	like.classList.add("like");
	like.classList.add("mid-block");
	main.appendChild(like);

	const addLike = document.createElement("div");
	addLike.classList.add("add-sub-block");
	addLike.draggable = true;
	addLike.insertAdjacentText("beforeend", "+");
	like.appendChild(addLike);

	const Unlike = document.createElement("div");
	Unlike.classList.add("Unlike");
	Unlike.classList.add("mid-block");
	main.appendChild(Unlike);

	const addUnLike = document.createElement("div");
	addUnLike.classList.add("add-sub-block");
	addUnLike.draggable = true;
	addUnLike.insertAdjacentText("beforeend", "+");
	Unlike.appendChild(addUnLike);

	return main;
}