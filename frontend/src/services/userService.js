import firebaseApp from "./firebase";
import { getFirestore, doc, getDoc, collection, query, where, getDocs, addDoc, deleteDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

const db = getFirestore(firebaseApp);

const userServices = {
    getUser: async function getUser(userId) {
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);
       
        if (docSnap.exists()) {
            return docSnap.data();
          } else {
            return {};
          }
        
    },

}

export default userServices