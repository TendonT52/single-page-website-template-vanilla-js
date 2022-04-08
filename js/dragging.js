import {
	main_block,
	add_main_block,
	container,
	mid_block,
	sub_block,
	top_name,
} from "./selectors.js";

let draggingSubBlock;
let draggingMainBlock;
let draggingNameBlock;

export function update_dragging() {
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
}

export function addClassDraggingSubBlock(block) {
	block.addEventListener("dragstart", (e) => {
		block.classList.add("dragging-sub-block");
		draggingSubBlock = block;
	});

	block.addEventListener("dragend", (e) => {
		block.classList.remove("dragging-sub-block");
		draggingSubBlock = null;
	});
}

export function addClassDraggingMainBlock(block) {
	block.addEventListener("dragstart", (e) => {
		block.classList.add("dragging-main-block");
		draggingMainBlock = block.parentNode;
		draggingNameBlock = block;
	});

	block.addEventListener("dragend", (e) => {
		block.classList.remove("dragging-main-block");
		draggingMainBlock = null;
		draggingNameBlock = null;
	});
}

export function updateMidBlock(mid_block) {
	mid_block.addEventListener("dragover", (e) => {
		if (draggingSubBlock == null) return;
		e.preventDefault();
		const blockAfterDraggingBlock = getBlockAfterDraggingBlock(
			mid_block,
			e.clientY
		);
		if (blockAfterDraggingBlock) {
			mid_block.insertBefore(draggingSubBlock, blockAfterDraggingBlock);
		} else {
			mid_block.insertBefore(
				draggingSubBlock,
				mid_block.querySelector(".add-sub-block")
			);
		}
	});
}

export function updateContainer(container) {
	container.addEventListener("dragover", (e) => {
		e.preventDefault();
		if (draggingMainBlock == null) return;
		if (draggingSubBlock != null) return;
		const list_main_block = [...main_block];
		const blockAfterDraggingBlock = list_main_block.reduce(
			(closestBlock, nextBlock) => {
				const nextBlockRect = nextBlock.getBoundingClientRect();
				const offsetX = nextBlockRect.left + nextBlockRect.width;
				const offsetY = nextBlockRect.top + nextBlockRect.height;
				if (
					e.clientX > nextBlockRect.left &&
					e.clientX < offsetX &&
					e.clientY > nextBlockRect.top &&
					e.clientY < offsetY
				) {
					const tmp = [offsetX, offsetY];
					return { tmp, element: nextBlock };
				} else {
					return closestBlock;
				}
			},
			[Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY]
		).element;
		if (blockAfterDraggingBlock) {
			container.insertBefore(draggingMainBlock, blockAfterDraggingBlock);
		} else {
			container.insertBefore(draggingMainBlock, add_main_block);
		}
	});
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
