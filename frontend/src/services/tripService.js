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
    postCity: async function postCity(tripId, cityData){
        await fetch(`${apiUrl}api/trips/${tripId}/cities`, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cityData)
        })
    },
    uploadImage:  async function uploadImage(tripId, formData) {
        console.log(formData)
        const response = await fetch(`${apiUrl}api/trips/${tripId}/images`, {
            method: "post",
            body: formData
        });
        if (response.status === 201) {
            const fileName = await response.json();
            console.log('fileName', fileName);
            return fileName;
        }
    }
}

export default tripServices