import {
  getFirestore, doc, getDoc, setDoc,
} from 'firebase/firestore';
import firebaseApp from './firebase';

const db = getFirestore(firebaseApp);

const userServices = {
  getUser: async function getUser(userId) {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    }
    return {};
  },
  editUser: async function editUser(userId, userData) {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, userData);
  },

};

export default userServices;
