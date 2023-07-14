import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { initializeApp } from "firebase/app";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAt-8vpmLL-ISfd0QKikzUzmVyj6ohxMJ8",
  authDomain: "chat-app-132ff.firebaseapp.com",
  databaseURL: "https://chat-app-132ff-default-rtdb.firebaseio.com",
  projectId: "chat-app-132ff",
  storageBucket: "chat-app-132ff.appspot.com",
  messagingSenderId: "475951918789",
  appId: "1:475951918789:web:a40a1f0b54f5279b360aac"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <App />
  </>
);

