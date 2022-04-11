import { createBlock, createMainBlock } from "./generate.js";
import { addPerson, delMode, persons, updatePerson } from "./model.js";
import { add_main_block, input_container } from "./selectors.js";
import { createPerson } from "./util.js";

export function addNewMainBlock(key) {
	const element = createBlock(key);
	persons.get(key).element = element;
	input_container.insertBefore(element, add_main_block);
}

export function callBackAddMainBlock() {
	const key = add_main_block.querySelector(".input-name").value;
	addPerson(key, createPerson());
	console.log(persons.get(key));
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
