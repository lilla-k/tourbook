import {
  getFirestore, collection, query, getDocs, addDoc, doc, deleteDoc, updateDoc, arrayUnion, arrayRemove,
} from 'firebase/firestore';
import {
  getStorage, ref, uploadBytes, getDownloadURL, deleteObject, updateMetadata,
} from 'firebase/storage';
import firebaseApp from './firebase.js';
import { toISODateString, toDateObject } from '../utils/date.js';

import type { Trip, TripDatabaseObject } from '../types/trip';
import type { City } from '../types/city';
import type { Image } from '../types/image';

const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

function tripDataFromDatabaseObejct(trip: TripDatabaseObject): Trip {
  return { ...trip, startDate: toDateObject(trip.startDate), endDate: toDateObject(trip.endDate), images: trip.images || [] };
}

function tripDataToDatabaseObject(tripData: Trip): TripDatabaseObject {
  return {
    ...tripData,
    ...(tripData.startDate && { startDate: toISODateString(tripData.startDate) }),
    ...(tripData.endDate && { endDate: toISODateString(tripData.endDate) }),
  };
}

// TODO: error handling
const tripServices = {
  getTrips: async function getTrips(userId: string): Promise<Trip[]> { // Promise<Array<Trip>>
    const q = query(collection(db, 'users', userId, 'trips'));
    const tripSnapshot = await getDocs(q);
    const tripList = tripSnapshot.docs.map((document) => ({ ...document.data(), id: document.id })) as unknown as TripDatabaseObject[];
    return tripList.map((trip) => (tripDataFromDatabaseObejct(trip)));
  },

  postTrip: async function postTrip(userId: string, tripData: Trip): Promise<string> {
    const docRef = await addDoc(collection(db, 'users', userId, 'trips'), tripDataToDatabaseObject(tripData));
    return docRef.id;
  },

  postCity: async function postCity(userId: string, tripId: string, cityData: City): Promise<string> {
    const cityId = crypto.randomUUID();
    const tripRef = doc(db, 'users', userId, 'trips', tripId);
    await updateDoc(tripRef, {
      visitedCities: arrayUnion({ ...cityData, cityId }),
    });
    return cityId;
  },

  postImageData: async function postImageData(userId: string, tripId: string, imageData: Image): Promise<void> {
    const tripRef = doc(db, 'users', userId, 'trips', tripId);
    await updateDoc(tripRef, {
      images: arrayUnion(imageData),
    });
  },

  editTrip: async function editTrip(userId: string, tripId: string, tripData: Partial<Trip>): Promise<void> {
    const tripRef = doc(db, 'users', userId, 'trips', tripId);
    console.log(tripData);
    await updateDoc(tripRef, tripDataToDatabaseObject(tripData));
  },

  editCity: async function editCity(userId: string, tripId: string, oldCityData: City, newCityData: City): Promise<void> {
    const tripRef = doc(db, 'users', userId, 'trips', tripId);
    const { cityId } = oldCityData;
    await updateDoc(tripRef, {
      visitedCities: arrayRemove(oldCityData),
    });
    await updateDoc(tripRef, {
      visitedCities: arrayUnion({ ...newCityData, cityId }),
    });
  },

  deleteTrip: async function deleteTrip(userId: string, tripId: string): Promise<void> {
    await deleteDoc(doc(db, 'users', userId, 'trips', tripId));
  },

  deleteCity: async function deleteCity(userId: string, tripId: string, deletedCity: City): Promise<void> {
    const tripRef = doc(db, 'users', userId, 'trips', tripId);
    await updateDoc(tripRef, {
      visitedCities: arrayRemove(deletedCity),
    });
  },

  uploadImage: async function uploadImage(userId:string, tripId:string, file: File): Promise<{ imageId: string, url: string }> {
    const imageId = crypto.randomUUID();
    const imageRef = ref(storage, `images/${userId}/${tripId}/${imageId}`);
    await uploadBytes(imageRef, file);
    await updateMetadata(imageRef, { cacheControl: 'private,max-age=86400' });
    const url = await getDownloadURL(imageRef);
    return { imageId, url };
  },

  deleteImage: async function deleteImage(userId:string, tripId: string, deletedImage: Image) {
    const imageRef = ref(storage, `images/${userId}/${tripId}/${deletedImage.id}`);
    deleteObject(imageRef).then(() => {
      console.log('File deleted successfully');
    }).catch((error) => {
      console.log('error occured');
    });
    const tripRef = doc(db, 'users', userId, 'trips', tripId);
    await updateDoc(tripRef, {
      images: arrayRemove(deletedImage),
    });
  },
};

export default tripServices;
