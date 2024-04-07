const tripServices = {
    getTrips: async function getTrips() {
        const response = await fetch("http://localhost:3001/api/trips");
        const trips = await response.json();
        return trips;
    },
    postTrip: async function postTrip(tripData) {
        const response = await fetch("http://localhost:3001/api/trips", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(tripData)
        });
        if (response.status === 201) {
            const tripIdObj = await response.json();
            return tripIdObj.id;
        }
    },
    updateTrip: async function updateTrip(tripId, tripData) {
        await fetch(`http://localhost:3001/api/${tripId}`, {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(tripData)
        })
    },
    postPhoto: async function postPhoto(tripId, photoData) {
        const response = await fetch(`http://localhost:3001/api/${tripId}/photos`, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(photoData)
        });
        if (response.status === 201) {
            return "photo data posted";
        }
    }
}

export default tripServices