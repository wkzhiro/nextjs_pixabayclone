import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyBmS3Tei2o5GL7NNryyfkqCyMqOenJyjz4",
    authDomain: "test-pixabay-clone.firebaseapp.com",
    projectId: "test-pixabay-clone",
    storageBucket: "test-pixabay-clone.appspot.com",
    messagingSenderId: "507895110663",
    appId: "1:507895110663:web:16cd3251437fa717319ea2"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  export default db;