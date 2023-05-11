import firebase from "firebase"
const firebaseConfig = {
  apiKey: 'AIzaSyDW9yVUFPTIIBARS8XhBTzJIilqZz1VNX0',

  authDomain: 'yemisprop.firebaseapp.com',

  projectId: 'yemisprop',

  storageBucket: 'yemisprop.appspot.com',

  messagingSenderId: '92986545542',

  appId: '1:92986545542:web:1b02077e786de35b720807',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export {firebase}