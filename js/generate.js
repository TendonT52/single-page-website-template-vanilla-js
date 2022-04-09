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

	const addLike = CreateDropDownBlock();
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

	const adddisLike = CreateDropDownBlock();
	dislike.appendChild(adddisLike);
	return main;
}

export function CreateDropDownItem(name){
	const item = document.createElement("div");
	item.classList.add("dropdown-item");
	item.insertAdjacentText("beforeend", name);
	return item;
}

export function CreateDropDownBlock(){
	const dropdown = document.createElement("div");
	dropdown.classList.add("dropdown");

	const input = document.createElement("input");
	input.setAttribute("type", "text");
	input.setAttribute("placeholder", "Add...");
	input.classList.add("myInput");
	dropdown.appendChild(input);

	const dropdown_content = document.createElement("div");
	dropdown_content.classList.add("dropdown-content");
	dropdown.appendChild(dropdown_content);

	return dropdown;
}