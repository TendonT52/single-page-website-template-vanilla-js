export function createPerson(like = [], dislike = [], element = null){
	return {
		like: like,
		dislike: dislike,
		element: element,
	}
}

export function oppositeMode(mode){
	if(mode == 'like') return 'dislike';
	if(mode == 'dislike') return 'like';
	console.error('wrong given mode')
}

export function convertformMainToPerson(element){
	const person = createPerson([],[],element);
	element.querySelector(".like").querySelectorAll(".sub-block").forEach(subblock => {
		const name = subblock.querySelector("p").textContent
		person.like.push(name);
	});
	element.querySelector(".dislike").querySelectorAll(".sub-block").forEach(subblock => {
		const name = subblock.querySelector("p").textContent
		person.dislike.push(name);
	});
	return person;
}