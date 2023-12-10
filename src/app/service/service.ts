import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDkRC2kkMtT5uTWFC5btBEUQKCAKgK1Lh0',
  authDomain: 'graphiql-app-abe6e.firebaseapp.com',
  projectId: 'graphiql-app-abe6e',
  storageBucket: 'graphiql-app-abe6e.appspot.com',
  messagingSenderId: '668172885070',
  appId: '1:668172885070:web:9eb23caaabc67f4abc371f',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export default class Service {
  static async signUp(email: string, password: string) {
    try {
      const resp = await createUserWithEmailAndPassword(auth, email, password);
      console.log(resp);
      await addDoc(collection(db, 'users'), {
        uid: resp.user.uid,
        authProvider: 'local',
        email,
      });
    } catch (err) {
      if (err instanceof Error) {
        console.log(err);
      }
    }
  }

  static async signIn(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      if (err instanceof Error) {
        console.log(err);
      }
    }
  }

  static async signOut() {
    signOut(auth);
  }
}