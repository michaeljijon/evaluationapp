import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCSGMBmCFshoa5BGolzYbLdvldFPN26bT8',
  authDomain: 'sincere-axon-225412.firebaseapp.com',
  databaseURL: 'https://sincere-axon-225412.firebaseio.com',
  projectId: 'sincere-axon-225412',
  storageBucket: 'sincere-axon-225412.appspot.com',
  messagingSenderId: '1020367291678',
  appId: '1:1020367291678:web:864fd895803a7f0604350f',
};
// Initialize Firebase
const firebaseapp = firebase.initializeApp(firebaseConfig);

export default firebaseapp.firestore();
