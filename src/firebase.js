// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1wLUMhdXn7tpw79X9LTSo0rhwg-XRZw0",
  authDomain: "textrpg-6e9c2.firebaseapp.com",
  databaseURL: "https://textrpg-6e9c2-default-rtdb.firebaseio.com",
  projectId: "textrpg-6e9c2",
  storageBucket: "textrpg-6e9c2.appspot.com",
  messagingSenderId: "1004555432949",
  appId: "1:1004555432949:web:4b1e7b3e69a5df86e966bc",
  measurementId: "G-3ZCVLYXFZS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);

//Handle Google sign-in
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access Google APIs.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
  
        // The signed-in user info.
        const user = result.user;
  
        // Redirect to game page
        window.location.href = '/game';
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
  
        // The email of the user's account used.
        const email = error.email;
  
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
  
        // Log error message
        console.log(errorMessage);
      });
  };
  