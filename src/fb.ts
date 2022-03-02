import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// 漏れても大丈夫
const firebaseConfig = {
  apiKey: "AIzaSyCOZ2kJ708GRnhRT41fglk6x7QxCsHelP0",
  authDomain: "fir-react-workshop-8f04b.firebaseapp.com",
  projectId: "fir-react-workshop-8f04b",
  storageBucket: "fir-react-workshop-8f04b.appspot.com",
  messagingSenderId: "661822477337",
  appId: "1:661822477337:web:ff22282edb16f69a764688",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
