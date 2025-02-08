import firebaseApp from "./firebase";
import { getFirestore, collection, query, getDocs, addDoc, doc, deleteDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject, updateMetadata } from "firebase/storage";
import {toISODateString, toDateObject} from '../utils/date.js';


const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

function tripDataFromDatabaseObejct(trip){
    return {...trip, startDate: toDateObject(trip.startDate), endDate: toDateObject(trip.endDate)}
}

function tripDataToDatabaseObejct(tripData) {
    return {
        ...tripData,
        ...(tripData.startDate && { startDate: toISODateString(tripData.startDate) }),
        ...(tripData.endDate && { endDate: toISODateString(tripData.endDate) }),
    };
}

// TODO: error handling
const tripServices = {
    getTrips: async function getTrips(userId) {
        const q = query(collection(db, "users", userId, "trips"));
        const tripSnapshot = await getDocs(q);
        const tripList = tripSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        return tripList.map(trip => (tripDataFromDatabaseObejct(trip)));
    },
    postTrip: async function postTrip(userId, tripData) {
        const docRef = await addDoc(collection(db, "users", userId, "trips"), tripDataToDatabaseObejct(tripData));
        return docRef.id;
    },
    postCity: async function postCity(userId, tripId, cityData) {
        const cityId = crypto.randomUUID()
        const tripRef = doc(db, "users", userId, "trips", tripId);
        await updateDoc(tripRef, {
            visitedCities: arrayUnion({ ...cityData, cityId: cityId })
        });
        return cityId;
    },
    postImageData: async function postImageData(userId, tripId, imageData){
        const tripRef = doc(db, "users", userId, "trips", tripId);
        await updateDoc(tripRef, {
            images: arrayUnion(imageData)
        });
    },
    editTrip: async function editTrip(userId, tripId, tripData) {
        const tripRef = doc(db, "users", userId, "trips", tripId);
        await updateDoc(tripRef, tripDataToDatabaseObejct(tripData));
    },
    editCity: async function editCity(userId, tripId, oldCityData, newCityData) { 
        const tripRef = doc(db, "users", userId, "trips", tripId);
        const cityId = oldCityData.cityId;
        await updateDoc(tripRef, {
            visitedCities: arrayRemove(oldCityData)
        });
        await updateDoc(tripRef, {
            visitedCities: arrayUnion({ ...newCityData, cityId: cityId })
        });
    },
    deleteTrip: async function deleteTrip(userId, tripId) {
        await deleteDoc(doc(db, "users", userId, "trips", tripId));
    },
    deleteCity: async function deleteCity(userId,tripId, deletedCity) {
        const tripRef = doc(db, "users", userId, "trips", tripId);
        await updateDoc(tripRef, {
            visitedCities: arrayRemove(deletedCity)
        });
    },
    uploadImage: async function uploadImage(userId, tripId, file) {
        const imageId = crypto.randomUUID();
        const imageRef = ref(storage, `images/${userId}/${tripId}/${imageId}`);
        await uploadBytes(imageRef, file);
        await updateMetadata(imageRef, { cacheControl: 'private,max-age=86400' });
        const url = await getDownloadURL(imageRef);
        return {imageId, url};
    },
    deleteImage: async function deleteImage(userId, tripId, deletedImage) {
        const imageRef = ref(storage, `images/${userId}/${tripId}/${deletedImage.id}`);
        deleteObject(imageRef).then(() => {
            console.log("File deleted successfully");
          }).catch((error) => {
            console.log("error occured");
          });
        const tripRef = doc(db, "users", userId, "trips", tripId);
        await updateDoc(tripRef, {
            images: arrayRemove(deletedImage)
        });
        
    },
}

export default tripServices