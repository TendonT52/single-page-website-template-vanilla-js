import { CreateDropDownItem } from "./generate.js";
import { data } from "./model.js";

export function config_dropdown() {
	const dropdown = document.querySelectorAll(".dropdown");
	dropdown.forEach((element) => {
		const input_text = element.querySelector(".myInput");
		let items = filter_dropdown_content(input_text.value);
		const dropdown_content = element.querySelector(".dropdown-content");
		input_text.addEventListener("focus", (e) => {
			update_dropdown_content(dropdown_content, items);
			dropdown_content.classList.add("show");
		});
		input_text.addEventListener("blur", (e) => {
			dropdown_content.classList.remove("show");
		});
		input_text.addEventListener("keyup", (e) => {
			items = filter_dropdown_content(input_text.value);
			update_dropdown_content(dropdown_content, items);
		});
	});
}

export function filter_dropdown_content(filter) {
	const content = [];
	data.forEach((val, key) => {
		const size = Math.min(key.length, filter.length);
		let bool = true;
		for(let i = 0 ; i < size ; i++){
			if(key[i].toUpperCase() != filter[i].toUpperCase()){
				bool = false;
				break;
			}
		}
		if(bool){
			content.push(key);
		}
	});
	return content
}

export function update_dropdown_content(parent, items) {
	const arrayOfNewChildren = [];
	items.forEach(item => {
		arrayOfNewChildren.push(CreateDropDownItem(item));
	});
	parent.replaceChildren(...arrayOfNewChildren);
}
