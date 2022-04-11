import { addMode, delMode, persons, updatePerson } from "./model.js";
import { add_main_block } from "./selectors.js";
import { oppositeMode } from "./util.js";

let draggingSub = null;
let draggingMain = null;
let draggingName = null;
let lastmidName = null;

export function callBackSubBlockDragStart(name, element) {
	draggingSub = {
		key: element.parentNode.parentNode.querySelector(".top-name").textContent,
		name: name,
		element: element,
	};
}

export function callBackSubBlockDragStop(key, name, element) {
	if (lastmidName == null) return;
	console.log(persons.get(lastmidName));
	console.log(persons.get(draggingSub.key));
	updatePerson(lastmidName, persons.get(lastmidName));
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
	if (draggingSub == null) return;
	if (key == draggingSub.name) return;
	let isRe = false;
	element.querySelectorAll(".sub-block").forEach((subblock) => {
		if (subblock.isSameNode(draggingSub.element)) return;
		if (draggingSub.name == subblock.textContent) {
			isRe = true;
			return;
		}
	});
	if (isRe) return;

	let isOp = false;
	element.parentNode
		.querySelector("." + oppositeMode(mode))
		.querySelectorAll(".sub-block")
		.forEach((subblock) => {
			if (subblock.isSameNode(draggingSub.element)) return;
			if (draggingSub.name == subblock.textContent) {
				isOp = true;
				return;
			}
		});
	if (isOp) return true;

	delMode(
		draggingSub.key,
		draggingSub.name,
		draggingSub.element.parentNode.className.split(" ")[0]
	);
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
	addMode(key, draggingSub.name, mode);
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
