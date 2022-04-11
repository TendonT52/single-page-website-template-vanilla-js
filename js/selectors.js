import { callBackAddMainBlock } from "./controller.js";

export let input_container;
export let add_main_block;

export function initSelector() {
	input_container = document.querySelectorAll(".container")[0];
	add_main_block = document.querySelector(".add-main-block");
	initAddMainBlock();
}

function initAddMainBlock() {
	add_main_block.querySelector('.btn-add-main-block').addEventListener("click", function (event) {
		callBackAddMainBlock();
	});
}
