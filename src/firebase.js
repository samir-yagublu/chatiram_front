


import { initializeApp } from "firebase/app";

import { getStorage } from "firebase/storage";

// console.log(process.env.REACT_STORAGE_API_KEY)
// const firebaseConfig = {

//   apiKey: process.env.REACT_STORAGE_API_KEY,

//   authDomain: process.env.REACT_STORAGE_AUTH_DOMAIN,

//   projectId: process.env.REACT_STORAGE_PROJECT_ID,

//   storageBucket: process.env.REACT_STORAGE_BUCKET,

//   messagingSenderId: process.env.REACT_STORAGE_MESSAGING_SENDER_ID,

//   appId: process.env.REACT_STORAGE_APP_ID

// };

const firebaseConfig = {

  apiKey: "AIzaSyATyGILlLajeMbRfAPr4nLQ0-h_uGoU1vk",

  authDomain: "chatiram-d9882.firebaseapp.com",

  projectId: "chatiram-d9882",

  storageBucket: "chatiram-d9882.appspot.com",

  messagingSenderId: "284990825414",

  appId: "1:284990825414:web:6f7568b1a98a0e86db88c7"

};




// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);