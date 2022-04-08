import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import {
	getFirestore,
	doc,
	getDoc,
	getDocs,
	collection,
	query,
	setDoc,
} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

const firebaseConfig = {
	apiKey: "AIzaSyAuakeKSlRUBw7H4Mw4Zp9uYiRIx6EGh2w",
	authDomain: "team-matching-9df71.firebaseapp.com",
	projectId: "team-matching-9df71",
	storageBucket: "team-matching-9df71.appspot.com",
	messagingSenderId: "688361058297",
	appId: "1:688361058297:web:98fa7184768936e5dbd728",
};

export let data = new Map();
export let app;
export let db;
export let graphRef;

export async function initFireBase() {
	app = initializeApp(firebaseConfig);
	db = getFirestore(app);
	graphRef = collection(db, "graph");
}

export async function load_AllData() {
	const querySnapshot = await getDocs(collection(db, "graph"));
	querySnapshot.forEach((doc) => {
		data.set(doc.id, { like: doc.data().like, dislike: doc.data().dislike });
	});
}

export async function addDataToDB(block) {
	await setDoc(doc(graphRef, block.name), {
		like: block.like,
		dislike: block.dislike,
	});
}
