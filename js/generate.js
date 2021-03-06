import { callBackDelMainBlock, callBackDelSubBlock } from "./controller.js";
import {
	callBackMidBlockDragOver,
	callBackNameBlockDragStart,
	callBackNameBlockDragStop,
	callBackSubBlockDragStart,
	callBackSubBlockDragStop,
	callBackMainBlockDragOver,
} from "./dragging.js";
import {
	callBackBlurDropDown,
	callBackClickDropDownItem,
	callBackFocusDropDown,
	callBackKeyupDropDown,
} from "./dropdown.js";
import { persons } from "./model.js";

export function createBlock(key) {
	const mainBlock = createMainBlock();

	const nameBlock = createNameBlock(key);
	mainBlock.appendChild(nameBlock);

	const likeBlock = createMidBlock(key, "like");
	var likeTitleBlock = document.createElement('div');
	likeTitleBlock.id="likeTitle";
	likeTitleBlock.appendChild(document.createTextNode("Likes"));
	likeBlock.appendChild(likeTitleBlock);
	const addLikeBlock = createDropDownBlock(key, "like");
	likeBlock.appendChild(addLikeBlock);
	persons.get(key).like.forEach((name) => {
		appendSubBlock(key, likeBlock, "like", name)
	});
	mainBlock.appendChild(likeBlock);

	const dislikeBlock = createMidBlock(key, "dislike");
	var dislikeTitleBlock = document.createElement('div');
	dislikeTitleBlock.id="dislikeTitle";
	dislikeTitleBlock.appendChild(document.createTextNode("Dislikes"));
	dislikeBlock.appendChild(dislikeTitleBlock);
	const addDisLikeBlock = createDropDownBlock(key, "dislike");
	dislikeBlock.appendChild(addDisLikeBlock);
	persons.get(key).dislike.forEach((name) => {
		appendSubBlock(key, dislikeBlock, "dislike", name)
	});
	mainBlock.appendChild(dislikeBlock);

	return mainBlock;
}

export function appendSubBlock(key, parent, mode, name) {
	const addBlock = parent.querySelector(".add-sub-block");
	parent.insertBefore(createSubBlock(key, name), addBlock);
}

export function createMainBlock() {
	const main = document.createElement("div");
	main.classList.add("main-block");
	main.addEventListener("dragover", (e) => {
		callBackMainBlockDragOver(main, e);
	});
	return main;
}

function createNameBlock(key) {
	const name = document.createElement("div");
	const h3 = document.createElement("h3");
	// name.draggable = true;
	name.classList.add("top-name");
	h3.insertAdjacentText("beforeend", key);
	name.appendChild(h3);
	name.appendChild(createDeleteMainBtn());

	name.addEventListener("dragstart", (e) => {
		name.classList.add("dragging-main-block");
		callBackNameBlockDragStart(key, name);
	});

	name.addEventListener("dragend", (e) => {
		name.classList.remove("dragging-main-block");
		callBackNameBlockDragStop(key, name);
	});

	return name;
}

function createMidBlock(key, mode) {
	const item = document.createElement("div");
	item.classList.add(mode);
	item.classList.add("mid-block");
	item.addEventListener("dragover", (e) => {
		callBackMidBlockDragOver(key, mode, item, e);
	});
	return item;
}

export function createSubBlock(key, name) {
	const item = document.createElement("div");
	const text = document.createElement("p");
	item.classList.add("sub-block");
	item.draggable = true;
	text.insertAdjacentText("beforeend", name);
	item.appendChild(text);
	item.addEventListener("dragstart", (e) => {
		item.classList.add("dragging-sub-block");
		callBackSubBlockDragStart(name, item);
	});

	item.addEventListener("dragend", (e) => {
		item.classList.remove("dragging-sub-block");
		callBackSubBlockDragStop(name, item);
	});

	item.appendChild(createDeleteSubBtn());
	return item;
}

export function createDropDownItem(key, mode, name) {
	const item = document.createElement("div");
	item.classList.add("dropdown-item");
	item.insertAdjacentText("beforeend", name);

	item.addEventListener("click", (e) => {
		callBackClickDropDownItem(key, mode, name, item);
	});

	return item;
}

export function createDropDownBlock(key, mode) {
	const dropdown = document.createElement("div");
	dropdown.classList.add("dropdown");
	dropdown.classList.add("add-sub-block");

	const input_text = document.createElement("input");
	input_text.setAttribute("type", "text");
	input_text.setAttribute("placeholder", "Add...");
	input_text.classList.add("myInput");

	const dropdown_content = document.createElement("div");
	dropdown_content.classList.add("dropdown-content");
	dropdown.appendChild(input_text);
	dropdown.appendChild(dropdown_content);

	input_text.addEventListener("focus", (e) => {
		callBackFocusDropDown(key, mode, dropdown_content);
	});
	input_text.addEventListener("blur", (e) => {
		callBackBlurDropDown(key, mode, dropdown_content);
	});
	input_text.addEventListener("keyup", (e) => {
		callBackKeyupDropDown(key, mode, dropdown_content, input_text.value);
	});

	return dropdown;
}

function createDeleteSubBtn(){
	const btn = document.createElement("button");
	btn.classList.add("del-sub-btn");
	btn.insertAdjacentText("beforeend", "");
	btn.addEventListener("click", (e) => {
		callBackDelSubBlock(btn);
	});
	return btn;
}

function createDeleteMainBtn(){
	const btn = document.createElement("button");
	btn.classList.add("del-main-btn");
	btn.insertAdjacentText("beforeend", "");
	btn.addEventListener("click", (e) => {
		callBackDelMainBlock(btn);
	});
	return btn;
}