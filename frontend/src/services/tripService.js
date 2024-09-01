import { getFirestore, collection, getDocs, addDoc, doc, setDoc, deleteDoc } from "firebase/firestore";
import firebaseApp from "./firebase";

const db = getFirestore(firebaseApp);

const apiUrl = process.env.REACT_APP_BACKEND_API;

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
        // if (response.status === 201) {
        //     const tripIdObj = await response.json();
        //     return tripIdObj.id;
        // }
    },
    editTrip: async function editTrip(tripId, tripData) {
        console.log(tripData)
        await setDoc(doc(db, "trips", tripId), tripData);
    },
    deleteTrip: async function deleteTrip(tripId) {
        await deleteDoc(doc(db, "trips", tripId));
    },
    postCity: async function postCity(tripId, cityData) {
        const response = await fetch(`${apiUrl}api/trips/${tripId}/cities`, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cityData)
        })
        if (response.status === 201) {
            const cityIdObj = await response.json();
            console.log(cityIdObj);
            return cityIdObj.cityId;
        }
    },
    editCity: async function editCity(tripId, cityId, cityData) {
        console.log("cityData", cityData);
        await fetch(`${apiUrl}api/trips/${tripId}/cities/${cityId}`, {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cityData)
        })
    },
    deleteCity: async function deleteCity(tripId, cityId) {
        await fetch(`${apiUrl}api/trips/${tripId}/cities/${cityId}`, {
            method: "DELETE",
        })
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