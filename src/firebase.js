import firebase from "firebase/app";
import "firebase/app";
import "firebase/database";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBL-aOKr4-OO4ux6-MxBlxsVVtpYHO_PIY",
    authDomain: "m-city-49e73.firebaseapp.com",
    databaseURL: "https://m-city-49e73.firebaseio.com",
    projectId: "m-city-49e73",
    storageBucket: "m-city-49e73.appspot.com",
    messagingSenderId: "184084184088",
    appId: "1:184084184088:web:d249787da3a9d72d51d76d",
    measurementId: "G-Z4GBXE1M8G",
};
firebase.initializeApp(firebaseConfig);

const firebaseDB = firebase.database();
const firebaseMatches = firebaseDB.ref("matches");
const firebasePromotions = firebaseDB.ref("promotions");

export { firebase, firebaseMatches, firebasePromotions };
