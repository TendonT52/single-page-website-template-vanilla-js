import { createBlock, createMainBlock } from "./generate.js";
import { persons } from "./model.js";
import { add_main_block, input_container } from "./selectors.js";

export function addNewMainBlock(key) {
	const element = createBlock(key);
	persons.get(key).element = element;
	input_container.insertBefore(element, add_main_block);
}
