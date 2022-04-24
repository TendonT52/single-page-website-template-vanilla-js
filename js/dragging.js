import { addMode, delMode, persons, updatePerson } from "./model.js";
import { add_main_block } from "./selectors.js";
import { convertformMainToPerson, oppositeMode } from "./util.js";

let draggingSub = null;
let draggingMain = null;
let draggingName = null;
let lastmidName = null;

export function callBackSubBlockDragStart(name, element) {
	console.log(persons)
	draggingSub = {
		key: element.parentNode.parentNode
			.querySelector(".top-name")
			.querySelector("h3").textContent,
		name: name,
		element: element,
	};
	delMode(
		draggingSub.key,
		draggingSub.name,
		draggingSub.element.parentNode.className.split(" ")[0]
	);
	// console.log(draggingSub);
	// convertformMainToPerson(element.parentNode.parentNode);
}

export function callBackSubBlockDragStop(name, element) {
	console.log(persons)
	if (lastmidName == null) return;
	const tmp = {
		key: element.parentNode.parentNode
			.querySelector(".top-name")
			.querySelector("h3").textContent,
		name: name,
		element: element,
	};
	// console.log(draggingSub.key, persons.get(draggingSub.key));
	// console.log(tmp.key, persons.get(tmp.key));

	persons.set(tmp.key, convertformMainToPerson(element.parentNode.parentNode));
	// console.log(draggingSub.key, persons.get(draggingSub.key));
	// console.log(tmp.key, persons.get(tmp.key));
	// console.log(tmp);
	// convertformMainToPerson(element.parentNode.parentNode);
	// console.log(persons.get(lastmidName));
	// console.log(persons.get(draggingSub.key));
	updatePerson(tmp.key, persons.get(tmp.key));
	updatePerson(draggingSub.key, persons.get(draggingSub.key));
	draggingSub = null;
}

export function callBackNameBlockDragStart(key, element) {
	draggingName = { key: key, element: element };
}

export function callBackNameBlockDragStop(key) {
	draggingName = null;
}

export function callBackMidBlockDragOver(key, mode, element, event) {
	lastmidName = key;
	if (
		!element.parentNode.isSameNode(draggingSub.element.parentNode.parentNode)
	) {
		if (key == draggingSub.name) return;
		if (
			!persons.get(key)[mode].reduce((p, c) => {
				return p && c != draggingSub.name;
			}, true)
		)
			return;
		if (
			!persons.get(key)[oppositeMode(mode)].reduce((p, c) => {
				return p && c != draggingSub.name;
			}, true)
		)
			return;
	}

	event.preventDefault();
	const blockAfterDraggingBlock = getBlockAfterDraggingBlock(
		element,
		event.clientY
	);
	if (blockAfterDraggingBlock) {
		element.insertBefore(draggingSub.element, blockAfterDraggingBlock);
	} else {
		element.insertBefore(
			draggingSub.element,
			element.querySelector(".add-sub-block")
		);
	}
}

export function getBlockAfterDraggingBlock(mid_block, yDraggingBlock) {
	let list_sub_block = [
		...mid_block.querySelectorAll(".sub-block:not(.dragging-sub-block)"),
	];
	return list_sub_block.reduce(
		(closestBlock, nextBlock) => {
			const nextBlockRect = nextBlock.getBoundingClientRect();
			const offset =
				yDraggingBlock - nextBlockRect.top - nextBlockRect.height / 2;

			if (offset < 0 && offset > closestBlock.offset) {
				return { offset, element: nextBlock };
			} else {
				return closestBlock;
			}
		},
		{ offset: Number.NEGATIVE_INFINITY }
	).element;
}

export function callBackMainBlockDragOver(element, event) {
	// 	if (draggingName == null) return;
	// 	if (draggingSub != null) return;
	// 	event.preventDefault();
	// 	const list_main_block = [
	// 		...document.querySelector(".container").querySelectorAll(".main-block"),
	// 	];
	// const blockAfterDraggingBlock = list_main_block.reduce(
	// 	(closestBlock, nextBlock) => {
	// 		const nextBlockRect = nextBlock.getBoundingClientRect();
	// 		const offsetX = nextBlockRect.left + nextBlockRect.width;
	// 		const offsetY = nextBlockRect.top + nextBlockRect.height;
	// 		if (
	// 			event.clientX > nextBlockRect.left &&
	// 			event.clientX < offsetX &&
	// 			event.clientY > nextBlockRect.top &&
	// 			event.clientY < offsetY
	// 		) {
	// 			const tmp = [offsetX, offsetY];
	// 			return { tmp, element: nextBlock };
	// 		} else {
	// 			return closestBlock;
	// 		}
	// 	},
	// 	[Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY]
	// ).element;
	// if (blockAfterDraggingBlock) {
	// 	document.querySelector(".container").insertBefore(draggingName.element.parentNode, blockAfterDraggingBlock);
	// } else {
	// 	document.querySelector(".container").insertBefore(draggingName.element.parentNode, add_main_block);
	// }
	// const list_main_block = [
	// 	...element.parentNode.querySelectorAll(".main-block"),
	// ];
	// const blockAfterDraggingBlock = list_main_block.reduce(
	// 	(closestBlock, nextBlock) => {
	// 		const nextBlockRect = nextBlock.getBoundingClientRect();
	// 		const offsetX = nextBlockRect.left + nextBlockRect.width;
	// 		const offsetY = nextBlockRect.top + nextBlockRect.height;
	// 		if (
	// 			event.clientX > nextBlockRect.left &&
	// 			event.clientX < offsetX &&
	// 			event.clientY > nextBlockRect.top &&
	// 			event.clientY < offsetY
	// 		) {
	// 			const tmp = [offsetX, offsetY];
	// 			return nextBlock;
	// 		} else {
	// 			return closestBlock;
	// 		}
	// 	},
	// 	[Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY]
	// ).element;
	// 	let blockAfterDraggingBlock = null;
	// 	let offsetX = 0;
	// 	let offsetY = 0;
	// 	list_main_block.forEach((e) => {
	// 		const nextBlockRect = e.getBoundingClientRect();
	// 		if (
	// 			event.clientX > offsetX &&
	// 			event.clientX < nextBlockRect.left + nextBlockRect.width / 2 &&
	// 			event.clientY > offsetY &&
	// 			event.clientY < nextBlockRect.top + nextBlockRect.height
	// 		) {
	// 			blockAfterDraggingBlock = e;
	// 		}
	// 		offsetX = nextBlockRect.left + nextBlockRect.width / 2;
	// 		offsetY = nextBlockRect.top;
	// 	});
	// 	if (blockAfterDraggingBlock) {
	// 		element.parentNode.insertBefore(draggingName.element.parentNode, blockAfterDraggingBlock);
	// 	} else {
	// 		element.parentNode.insertBefore(
	// 			draggingName.element.parentNode,
	// 			add_main_block
	// 		);
	// 	}
}
