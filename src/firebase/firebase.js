import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCC3G0cT82iPakM9lxTQyeyeJn8EWQQiUI",
  authDomain: "dropify-d3d8f.firebaseapp.com",
  projectId: "dropify-d3d8f",
  storageBucket: "dropify-d3d8f.appspot.com",
  messagingSenderId: "798785816667",
  appId: "1:798785816667:web:7a6b89ef2ce0518bda577e",
  measurementId: "G-9N0V85DP1F",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
