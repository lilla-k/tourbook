import {
  getFirestore, doc, getDoc, setDoc,
} from 'firebase/firestore';
import firebaseApp from './firebase.js';
import type { UserSettings } from '../types/user.ts';

const db = getFirestore(firebaseApp);

const userServices = {
  getUser: async function getUser(userId: string): Promise<UserSettings> {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as UserSettings;
    }
    return {};
  },
  editUser: async function editUser(userId: string, UserSettings: UserSettings): Promise<void> {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, UserSettings);
  },

};

export default userServices;
