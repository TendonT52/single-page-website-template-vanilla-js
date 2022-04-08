import {
	addClassDraggingMainBlock,
	addClassDraggingSubBlock,
	updateContainer,
	updateMidBlock,
	update_dragging,
} from "./dragging.js";
import { dropdown } from "./dropdown.js";
import { CreateMainBlock } from "./generate.js";
import { initFireBase, load_AllData, data, addDataToDB } from "./model.js";
import {
	add_main_block,
	container,
	mid_block,
	sub_block,
	top_name,
	update_selector,
} from "./selectors.js";

initFireBase();
update_selector();
update_dragging();
load_AllData().then(() => {
	data.forEach((value, key) =>
	container[0].insertBefore(
		CreateMainBlock({ name: key, like: value.like, dislike: value.dislike }),
		add_main_block)
	);
	update_selector();
	update_dragging();
});

// dropdown();

add_main_block.addEventListener("click", function (event) {
	container[0].insertBefore(
		CreateMainBlock({
			name: "testname",
			like: ["like1", "like2"],
			dislike: ["dislike1", "dislike2"],
		}),
		add_main_block
	);
	update_selector();
	update_dragging();
});

// console.log("qwe");
// addDataToDB({
// 	name: "testname",
// 	like: ["like1", "like2"],
// 	dislike: ["dislike1", "dislike2"],
// }).then(() => {
// 	data.forEach((value, key) => console.log(key, value.like, value.dislike));
// });
