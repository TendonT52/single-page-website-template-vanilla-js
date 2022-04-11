import {  } from "./generate.js";
import {  } from "./model.js";

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
			if (dropdown_content.querySelector(":hover") == null) {
				dropdown_content.classList.remove("show");
			}
		});
		input_text.addEventListener("keyup", (e) => {
			items = filter_dropdown_content(input_text.value)
			// .filter((name) => {
			// 	const key = dropdown_content.parentNode.parentNode.parentNode
			// 		.querySelector(".top-name")
			// 		.querySelector("h3").innerHTML;
			// 	data.get(key)
			// });
			update_dropdown_content(dropdown_content, items);
		});
	});
}

export function filter_dropdown_content(filter) {
	const content = [];
	data.forEach((val, key) => {
		const size = Math.min(key.length, filter.length);
		let bool = true;
		for (let i = 0; i < size; i++) {
			if (key[i].toUpperCase() != filter[i].toUpperCase()) {
				bool = false;
				break;
			}
		}
		if (bool) {
			content.push(key);
		}
	});
	return content;
}

export function update_dropdown_content(parent, items) {
	const arrayOfNewChildren = [];
	items.forEach((item) => {
		const block = CreateDropDownItem(item);
		block.addEventListener("click", (e) => {
			const name = parent.parentNode.parentNode.parentNode
				.querySelector(".top-name")
				.querySelector("h3").innerHTML;
			const type = parent.parentNode.parentNode.className[0];
			if (type == "l") {
				data.get(name).like.push(item);
			}
			if (type == "d") {
				data.get(name).dislike.push(item);
			}
			updateDataToDB({
				name: name,
				like: data.get(name).like,
				dislike: data.get(name).dislike,
			});
			parent.classList.remove("show");
		});
		arrayOfNewChildren.push(block);
	});
	parent.replaceChildren(...arrayOfNewChildren);
}
