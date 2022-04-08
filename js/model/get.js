import {
	getFirestore,
	doc,
	getDoc,
	getDocs,
	collection,
	query,
	setDoc,
} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { db } from "./init.js";

export async function getAllData(){
	let querySnapshot = await getDocs(collection(db, "graph"));
	return querySnapshot
}

