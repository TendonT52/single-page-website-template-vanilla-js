import {
	addClassDraggingMainBlock,
	addClassDraggingSubBlock,
	updateContainer,
	updateMidBlock,
	update_dragging,
} from "./dragging.js";
import { dropdown } from "./dropdown.js";
import { CreateMainBlock, CreateMainBlock1 } from "./generate.js";
import { addBlockToDB } from "./model/add.js";
import { getAllData } from "./model/get.js";
import { initFireBase } from "./model/init.js";
// import { initFireBase } from "./model/init.js";
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
// dropdown();

add_main_block.addEventListener("click", function (event) {
	container[0].insertBefore(
		CreateMainBlock1({
			name: "testname",
			like: ["like1", "like2"],
			dislike: ["dislike1", "dislike2"],
		}),
		add_main_block
	);
	update_selector();
	update_dragging();
});

addBlockToDB({
	name: "testname1",
	like: ["like1",, "like3"],
	dislike: ["dislike1", "dislike2"],
});
