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

export let app;
export let db;
export let graphRef;

export function initFireBase() {
	app = initializeApp(firebaseConfig);
	db = getFirestore(app);
	graphRef = collection(db, "graph");
}
