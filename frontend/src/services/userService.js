import firebaseApp from "./firebase";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";

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
    editUser: async function editUser(userId, userData) {
        const userRef = doc(db, "users", userId);
        await updateDoc(userRef, userData);
    }

}

export default userServices