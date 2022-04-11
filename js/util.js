export function createPerson(name, like = [], dislike = [], element = null){
	return {
		name : name,
		like: like,
		dislike: dislike,
		element: element,
	}
}