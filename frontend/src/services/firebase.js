import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCsnI4m1w0OS0kBDZTUQBjaHJTaqnn94kA",
    authDomain: "tourbook-3382a.firebaseapp.com",
    projectId: "tourbook-3382a",
    storageBucket: "tourbook-3382a.appspot.com",
    messagingSenderId: "326891669624",
    appId: "1:326891669624:web:576c20977b80245f5b858d",
    measurementId: "G-ES2NCN0HC2",
  };

  const firebaseApp = initializeApp(firebaseConfig);

  export default firebaseApp;