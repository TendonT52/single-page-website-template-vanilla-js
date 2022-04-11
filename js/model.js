import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import {
	getFirestore,
	doc,
	getDoc,
	getDocs,
	collection,
	query,
	setDoc,
	deleteDoc,
} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

const firebaseConfig = {
	apiKey: "AIzaSyAuakeKSlRUBw7H4Mw4Zp9uYiRIx6EGh2w",
	authDomain: "team-matching-9df71.firebaseapp.com",
	projectId: "team-matching-9df71",
	storageBucket: "team-matching-9df71.appspot.com",
	messagingSenderId: "688361058297",
	appId: "1:688361058297:web:98fa7184768936e5dbd728",
};

export let persons = new Map();
export let app;
export let db;
export let graphRef;

export async function initFireBase() {
	app = initializeApp(firebaseConfig);
	db = getFirestore(app);
	graphRef = collection(db, "graph");
}

export async function loadPersons() {
	const querySnapshot = await getDocs(collection(db, "graph"));
	querySnapshot.forEach((doc) => {
		persons.set(doc.id, {
			like: doc.data().like,
			dislike: doc.data().dislike,
			element: null,
		});
	});
}

async function addDB(key, value) {
	await setDoc(doc(graphRef, key), {
		like: value.like,
		dislike: value.dislike,
	});
}

async function delDB(key) {
	await deleteDoc(doc(graphRef, key));
}

export function addPerson(key, value) {
	if (persons.has(key)) return false;
	persons.set(key, value);
	addDB(key, value);
	return true;
}

export function delPerson(key) {
	if (!persons.has(key)) return false;
	persons.delete(key);
	delDB(key)
	return true;
}

export function updatePerson(key, value) {
	if (!persons.has(key)) return false;
	addDB(key, value)
	return true;
}

export function addMode(key, name, mode) {
	if (!persons.has(key)) return false;
	if (persons.get(key)[mode].includes(name)) return false;
	persons.get(key)[mode].push(name);
	console.log("add", key, name ,mode);
	return true;
}

export function delMode(key, name, mode) {
	if (!persons.has(key)) return false;
	persons.get(key)[mode] = persons.get(key)[mode].filter(e => e != name)
	console.log("del", key, name ,mode);
	return true;
}