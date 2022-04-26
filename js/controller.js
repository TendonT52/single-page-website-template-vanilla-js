import { createBlock, createMainBlock } from "./generate.js";
import {
	addPerson,
	delMode,
	delPerson,
	persons,
	updatePerson,
} from "./model.js";
import { add_main_block, input_container } from "./selectors.js";
import { createPerson } from "./util.js";

export function addNewMainBlock(key) {
	const element = createBlock(key);
	persons.get(key).element = element;
	input_container.insertBefore(element, add_main_block);
}

export function callBackAddMainBlock() {
	const key = add_main_block.querySelector(".input-name").value;
	if (key == "") return;
	if (key.length>11) {
		alert("Error! Maximum 11 characters name allowed");
		return;
	}
	if (persons.has(key)) {
		alert("Error! Duplicate name") ;
		return;
	}
	add_main_block.querySelector(".input-name").value = '';
	addPerson(key, createPerson());
	const element = createBlock(key);
	persons.get(key).element = element;
	input_container.insertBefore(element, add_main_block);
	// createPerson()
	// addPerson()
}

export function callBackDelSubBlock(element) {
	const key = element.parentNode.parentNode.parentNode
		.querySelector(".top-name")
		.querySelector("h3").textContent;
	const mode = element.parentNode.parentNode.className.split(" ")[0];
	const name = element.parentNode.querySelector("p").textContent;
	delMode(key, name, mode);
	updatePerson(key, persons.get(key));
	element.parentNode.remove();
}

export function callBackDelMainBlock(element) {
	const key = element.parentNode.querySelector("h3").textContent;
	document.querySelectorAll(".sub-block").forEach((e) => {
		const tmp = e.querySelector("p");
		if (tmp == null) return;
		if (e.querySelector("p").textContent == key) {
			const ekey = e.parentNode.parentNode
				.querySelector(".top-name")
				.querySelector("h3").textContent;
			const name = e.querySelector("p").textContent;
			const mode = e.parentNode.className.split(" ")[0];
			console.log(ekey, name, mode);
			e.remove();
			delMode(ekey, name, mode);
			updatePerson(ekey, persons.get(ekey));
		}
	});
	delPerson(key);
	element.parentNode.parentNode.remove();
}
