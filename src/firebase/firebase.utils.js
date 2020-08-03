import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAXG52LwWAfmcyF8E3XXxdvXAp1AnONe58",
  authDomain: "crwn-db-91898.firebaseapp.com",
  databaseURL: "https://crwn-db-91898.firebaseio.com",
  projectId: "crwn-db-91898",
  storageBucket: "crwn-db-91898.appspot.com",
  messagingSenderId: "162390018832",
  appId: "1:162390018832:web:acb9b3dcd48f05cdfcf395",
  measurementId: "G-G114NEXHFY"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`/users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      userRef.set({
        displayName, email, createdAt, ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message)
    }
    
  }

  return userRef

}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;