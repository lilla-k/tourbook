import { getFirestore, collection, getDocs, addDoc, doc, deleteDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import firebaseApp from "./firebase";

const db = getFirestore(firebaseApp);

const apiUrl = process.env.REACT_APP_BACKEND_API;

// TODO: error handling
const tripServices = {
    getTrips: async function getTrips() {
        const tripsCol = collection(db, "trips");
        const tripSnapshot = await getDocs(tripsCol);
        const tripList = tripSnapshot.docs.map(doc => ({...doc.data(), id: doc.id}));
        return tripList;
    },
    postTrip: async function postTrip(tripData) {
        const docRef = await addDoc(collection(db, "trips"), tripData);
        return docRef.id;
    },
    editTrip: async function editTrip(tripId, tripData) {
        const tripRef = doc(db, "trips", tripId);
        await updateDoc(tripRef, tripData);
    },
    deleteTrip: async function deleteTrip(tripId) {
        await deleteDoc(doc(db, "trips", tripId));
    },
    postCity: async function postCity(tripId, cityData) {
        const cityId = crypto.randomUUID()
        const tripRef = doc(db, "trips", tripId);
        await updateDoc(tripRef, {
            visitedCities: arrayUnion({...cityData, cityId: cityId})
        });
        return cityId;
    },
    editCity: async function editCity(tripId, oldCityData, newCityData) { //TODO: use editTrip
        const tripRef = doc(db, "trips", tripId);
        const cityId=oldCityData.cityId;
        await updateDoc(tripRef, {
            visitedCities: arrayRemove(oldCityData)
        });    
        await updateDoc(tripRef, {
            visitedCities: arrayUnion({...newCityData, cityId: cityId})
        });        
    },
    deleteCity: async function deleteCity(tripId, deletedCity) {
        const tripRef = doc(db, "trips", tripId);
        await updateDoc(tripRef, {
            visitedCities: arrayRemove(deletedCity)
        });    
    },
    uploadImage: async function uploadImage(tripId, formData) {
        const response = await fetch(`${apiUrl}api/trips/${tripId}/images`, {
            method: "post",
            body: formData
        });
        if (response.status === 201) {
            const id = await response.json();
            return id;
        }
    },
    setCoverImage: async function setCoverImage(tripId, imageId) {
        await fetch(`${apiUrl}api/trips/${tripId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ coverImageId: imageId })
        })
    }
}

export default tripServices