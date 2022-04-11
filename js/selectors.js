export let container;
export let main_block;
export let mid_block;
export let sub_block;
export let add_main_block;
export let top_name;
export let add_sub_block;

export function update_selector() {
	container = document.querySelectorAll(".container");
	main_block = document.querySelectorAll(".main-block");
	mid_block = document.querySelectorAll(".mid-block");
	sub_block = document.querySelectorAll(".sub-block");
	add_main_block = document.querySelector(".add-main-block");
	top_name = document.querySelectorAll(".top-name");
	add_sub_block = document.getElementsByClassName("add-sub-block");
}
