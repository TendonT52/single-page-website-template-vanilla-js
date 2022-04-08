import {
	addClassDraggingMainBlock,
	addClassDraggingSubBlock,
	updateContainer,
	updateMidBlock,
} from "./dragging.js";
import { dropdown } from "./dropdown.js";
import { CreateMainBlock } from "./generate.js";
import { getAllData } from "./model/get.js";
import { initFireBase } from "./model/init.js";
// import { initFireBase } from "./model/init.js";
import {
	add_main_block,
	container,
	mid_block,
	sub_block,
	top_name,
	update,
} from "./selectors.js";

initFireBase();
update();
// dropdown();

sub_block.forEach((block) => {
	addClassDraggingSubBlock(block);
});

top_name.forEach((block) => {
	addClassDraggingMainBlock(block);
});

mid_block.forEach((mid_block) => {
	updateMidBlock(mid_block);
});

container.forEach((main_block) => {
	updateContainer(main_block);
});

add_main_block.addEventListener("click", function (event) {
	container[0].insertBefore(CreateMainBlock(), add_main_block);
	update();
});

// getAllData().forEach(doc => {
// 	console.log(doc.id, " => ", doc.data());
// })

// getAllData().then((e) => {
// 	e.forEach((doc) => {
// 		console.log(doc.id, " => ", doc.data());
// 	});
// });

// data.forEach((doc) => {
// 	// doc.data() is never undefined for query doc snapshots
// 	console.log(doc.id, " => ", doc.data());
// });
