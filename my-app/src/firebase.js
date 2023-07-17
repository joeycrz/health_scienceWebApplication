import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";  
import {getDatabase} from 'firebase/database';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDcLkxlfQh5_bgrOOiScY7fn7ss_yAdjUA",
  authDomain: "healthscienceannouncements.firebaseapp.com",
  databaseURL: "https://healthscienceannouncements-default-rtdb.firebaseio.com",
  projectId: "healthscienceannouncements",
  storageBucket: "healthscienceannouncements.appspot.com",
  messagingSenderId: "157415059458",
  appId: "1:157415059458:web:85f54148111dbce53ab71b",
  measurementId: "G-XRT1GDF0Z5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getDatabase(app);