import { callBackAddMainBlock } from "./controller.js";
import { generateSolution } from "./calculateGroup.js";

export let input_container;
export let result_container;
export let add_main_block;
export let btn_Result;
export let tableShow;
export let numberOfGroup;

export function initSelector() {
	input_container = document.querySelectorAll(".container")[0];
	result_container = document.querySelectorAll(".container")[1];
	add_main_block = document.querySelector(".add-main-block");
	btn_Result = document.querySelector('.genButton') ;
	tableShow = document.querySelector('.tableShow') ;
	initBtnResult()
}

function initBtnResult(){
	btn_Result.addEventListener('click', () => {
		numberOfGroup = document.getElementById("inputGroup").valueAsNumber ;
		generateSolution(numberOfGroup) ;
		tableShow.style.display = 'block' ;
	});
	initAddMainBlock();
}

function initAddMainBlock() {
	add_main_block.querySelector('.btn-add-main-block').addEventListener("click", function (event) {
		callBackAddMainBlock();
	});
}
