import firebaseApp from "./firebase";
import { getFirestore, collection, getDocs, addDoc, doc, deleteDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { getStorage, ref, uploadBytes, listAll, getMetadata, getDownloadURL } from "firebase/storage";


const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

const apiUrl = process.env.REACT_APP_BACKEND_API;

// TODO: error handling
const tripServices = {
    getTrips: async function getTrips() {
        const tripsCol = collection(db, "trips");
        const tripSnapshot = await getDocs(tripsCol);
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
    editTrip: async function editTrip(tripId, tripData) {
        const tripRef = doc(db, "trips", tripId);
        await updateDoc(tripRef, tripData);
    },
    editCity: async function editCity(tripId, oldCityData, newCityData) { //TODO: use editTrip
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
    uploadImage: async function uploadImage(tripId, cityId, file, title) {
        const imageId = crypto.randomUUID();
        const imageRef = ref(storage, `images/${tripId}/${imageId}`);
        await uploadBytes(imageRef, file, {customMetadata: { title, cityId }});
        return imageId;
    },
    getImages: async function getImages(tripId) {
        const listRef = ref(storage, `images/${tripId}`);
        const response = await listAll(listRef);
        const images = await Promise.all(response.items.map(async itemRef =>{
            const url = await getDownloadURL(itemRef);
            return {url: url};
        }))
        return images
        // const metadata = await getMetadata(listRef);
        console.log(response);
        // console.log(metadata)
        // return metadata;

    },
    setCoverImage: async function setCoverImage(tripId, imageId) {
        await fetch(`${ apiUrl }api / trips / ${ tripId }`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ coverImageId: imageId })
        })
    }
}

export default tripServices