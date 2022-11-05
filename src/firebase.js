import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCG_4Y5KonwfJM1CPcl9Z4zYkuMTs4vVlc',
  authDomain: 'sveltefirebasecrud.firebaseapp.com',
  projectId: 'sveltefirebasecrud',
  storageBucket: 'sveltefirebasecrud.appspot.com',
  messagingSenderId: '1051976938692',
  appId: '1:1051976938692:web:9e8ea858d2adf5ff36c591',
};

const app = initializeApp(firebaseConfig);
export const databaseFirestore = getFirestore(app);
