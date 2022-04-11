import { createDropDownItem } from "./generate.js";
import { addMode, persons, updatePerson } from "./model.js";

export function callBackFocusDropDown(key, mode, dropdown_content) {
	update_dropdown_content(key, mode, dropdown_content, "");
	dropdown_content.classList.add("show");
}

export function callBackBlurDropDown(key, mode, dropdown_content) {
	if (dropdown_content.querySelector(":hover") == null) {
		dropdown_content.classList.remove("show");
	}
}

export function callBackKeyupDropDown(key, mode, dropdown_content, filter) {
	update_dropdown_content(key, mode, dropdown_content, filter);
}

export function callBackClickDropDownItem(key, mode, name, element) {
	addMode(key, name, mode);
	updatePerson(key, persons.get(key));
	element.parentNode.classList.remove("show");
}

export function update_dropdown_content(key, mode, dropdown_content, filter) {
	const arrayOfNewChildren = [];
	let allPerson = [];
	const alreadyHave = persons.get(key)[mode];
	
	persons.forEach((v, k) => allPerson.push(k));
	
	allPerson = allPerson.filter((person) => {
		if (person == key) return false;
		if (alreadyHave.includes(person)) return false;
		const size = Math.min(person.length, filter.length);
		for (let i = 0; i < size; i++) {
			if (key[i].toUpperCase() != filter[i].toUpperCase()) {
				return false;
			}
		}
		return true;
	});

	allPerson.forEach((name) => {
		const block = createDropDownItem(key, mode, name);
		arrayOfNewChildren.push(block);
	});

	dropdown_content.replaceChildren(...arrayOfNewChildren);
}
