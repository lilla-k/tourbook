import {
  getFirestore, doc, getDoc, setDoc,
} from 'firebase/firestore';
import firebaseApp from './firebase.js';
import type { User } from '../types/user.ts';

const db = getFirestore(firebaseApp);

const userServices = {
  getUser: async function getUser(userId: string): Promise<User> {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as User;
    }
    return {};
  },
  editUser: async function editUser(userId: string, userData: User): Promise<void> {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, userData);
  },

};

export default userServices;
