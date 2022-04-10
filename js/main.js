import { addNewMainBlock } from "./controller.js";
import { config_dropdown } from "./dropdown.js";
import {  } from "./generate.js";
import { initFireBase,loadPersons , addPerson, persons, delPerson, updatePerson } from "./model.js";
import {
	initSelector
} from "./selectors.js";
import { createPerson } from "./util.js";

initFireBase();
initSelector();

loadPersons().then(() => {
	persons.forEach((value, key) => {
		addNewMainBlock(key);
	});
	// config_dropdown();
});

// add_main_block.addEventListener("click", function (event) {
// 	container[0].insertBefore(
// 		CreateMainBlock({
// 			name: "testname",
// 			like: ["like1", "like2"],
// 			dislike: ["dislike1", "dislike2"],
// 		}),
// 		add_main_block
// 	);
// 	update_selector();
// 	update_dragging();
// });
