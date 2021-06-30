import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics'

const config = {
    apiKey: "AIzaSyCRR5tt_UuoNa4c3jKrb_DYLFc5WsupDqQ",
    authDomain: "crwn-db-1132f.firebaseapp.com",
    projectId: "crwn-db-1132f",
    storageBucket: "crwn-db-1132f.appspot.com",
    messagingSenderId: "634373349698",
    appId: "1:634373349698:web:a5ce6c2cc36da3ddb3e8db",
    measurementId: "G-4G165RH0Y7"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if (!snapShot.exists) {

        const { displayName, email } = userAuth;
        const createdAt = new Date();
        
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch(error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}

// Initialize Firebase
firebase.initializeApp(config);
firebase.analytics();

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider).catch(()=>{});
export default firebase;