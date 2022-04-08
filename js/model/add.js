import {
	doc,
	getDoc,
	setDoc,
	query,
	where,
	collection,
} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { db, graphRef } from "./init.js";

export async function addBlockToDB(block) {
	const docRef = doc(graphRef, "testname2");
	// const docSnap = await getDoc(docRef);
	// if (docSnap.exists()) {
	// 	return false;
	// } else {
		await setDoc(doc(graphRef, "testname2"), {
			like: block.like,
			dislike: block.dislike,
		});
	// 	return true;
	// }
}
