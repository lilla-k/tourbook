const apiUrl = process.env.REACT_APP_BACKEND_API;

const tripServices = {
    getTrips: async function getTrips() {
        const response = await fetch(`${apiUrl}api/trips`);
        const trips = await response.json();
        return trips;
    },
    postTrip: async function postTrip(tripData) {
        const response = await fetch(`${apiUrl}api/trips`, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(tripData)
        });
        if (response.status === 201) {
            const tripIdObj = await response.json();
            return tripIdObj.id;
        }
    },
    editTrip: async function editTrip(tripId, tripData) {
        await fetch(`${apiUrl}api/trips/${tripId}`, {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(tripData)
        })
    },
    deleteTrip: async function deleteTrip(tripId) {
        console.log("deletetrip tripservice")
        await fetch(`${apiUrl}api/trips/${tripId}`, {
            method: "DELETE",
        })
    },
    postCity: async function postCity(tripId, cityData){
        await fetch(`${apiUrl}api/trips/${tripId}/cities`, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cityData)
        })
    },
    editCity: async function editCity(tripId, cityId, cityData){
        console.log("cityData", cityData);
        await fetch(`${apiUrl}api/trips/${tripId}/cities/${cityId}`, {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cityData)
        })
    },
    deleteCity: async function deleteCity(tripId, cityId) {
        console.log("deletecity tripservice")
        await fetch(`${apiUrl}api/trips/${tripId}/cities/${cityId}`, {
            method: "DELETE",
        })
    },
    uploadImage:  async function uploadImage(tripId, formData) {
        const response = await fetch(`${apiUrl}api/trips/${tripId}/images`, {
            method: "post",
            body: formData
        });
        if (response.status === 201) {
            const id = await response.json();
            console.log('id', id);
            return id;
        }
    },
    setCoverImage: async function setCoverImage(tripId, imageId){
        await fetch(`${apiUrl}api/trips/${tripId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({coverImageId: imageId})
        })
    }
}

export default tripServices