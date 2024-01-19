// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyCnBq5LMWgCSdBmCe15RIC2LbqrIKxUQNg',
	authDomain: 'travells-992af.firebaseapp.com',
	projectId: 'travells-992af',
	storageBucket: 'travells-992af.appspot.com',
	messagingSenderId: '606706243036',
	appId: '1:606706243036:web:26ac0daa66cddf95bbab19',
	measurementId: 'G-VEZP809H1Y'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
