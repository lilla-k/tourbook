import firebaseApp from "./firebase";
import { getFirestore, collection, query, where, getDocs, addDoc, doc, deleteDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";


const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);


// TODO: error handling
const tripServices = {
    getTrips: async function getTrips(userId) {
        const q = query(collection(db, "trips"), where("userId", "==", userId));
        const tripSnapshot = await getDocs(q);
        const tripList = tripSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        return tripList;
    },
    postTrip: async function postTrip(tripData) {
        const docRef = await addDoc(collection(db, "trips"), tripData);
        return docRef.id;
    },
    postCity: async function postCity(tripId, cityData) {
        const cityId = crypto.randomUUID()
        const tripRef = doc(db, "trips", tripId);
        await updateDoc(tripRef, {
            visitedCities: arrayUnion({ ...cityData, cityId: cityId })
        });
        return cityId;
    },
    postImageData: async function postImageData(tripId, imageData){
        const tripRef = doc(db, "trips", tripId);
        await updateDoc(tripRef, {
            images: arrayUnion(imageData)
        });
    },
    editTrip: async function editTrip(tripId, tripData) {
        const tripRef = doc(db, "trips", tripId);
        await updateDoc(tripRef, tripData);
    },
    editCity: async function editCity(tripId, oldCityData, newCityData) { 
        const tripRef = doc(db, "trips", tripId);
        const cityId = oldCityData.cityId;
        await updateDoc(tripRef, {
            visitedCities: arrayRemove(oldCityData)
        });
        await updateDoc(tripRef, {
            visitedCities: arrayUnion({ ...newCityData, cityId: cityId })
        });
    },
    deleteTrip: async function deleteTrip(tripId) {
        await deleteDoc(doc(db, "trips", tripId));
    },
    deleteCity: async function deleteCity(tripId, deletedCity) {
        const tripRef = doc(db, "trips", tripId);
        await updateDoc(tripRef, {
            visitedCities: arrayRemove(deletedCity)
        });
    },
    uploadImage: async function uploadImage(tripId, file) {
        const imageId = crypto.randomUUID();
        const imageRef = ref(storage, `images/${tripId}/${imageId}`);
        await uploadBytes(imageRef, file);
        const url = await getDownloadURL(imageRef);
        return {imageId, url};
    },
    deleteImage: async function deleteImage(tripId, deletedImage) {
        const imageRef = ref(storage, `images/${tripId}/${deletedImage.id}`);
        deleteObject(imageRef).then(() => {
            console.log("File deleted successfully");
          }).catch((error) => {
            console.log("error occured");
          });
        const tripRef = doc(db, "trips", tripId);
        await updateDoc(tripRef, {
            images: arrayRemove(deletedImage)
        });
        
    },
}

export default tripServices