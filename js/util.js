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