/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkJjpYZbM6tbAqEUXZy1rkAVb_VgTQk_M",
  authDomain: "e-commerce-coder-23d34.firebaseapp.com",
  projectId: "e-commerce-coder-23d34",
  storageBucket: "e-commerce-coder-23d34.appspot.com",
  messagingSenderId: "195325311782",
  appId: "1:195325311782:web:87170cb14750d35b5ddfe7",
  measurementId: "G-0YQLN0KZG4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);