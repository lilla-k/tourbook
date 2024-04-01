const tripServices = {
    getTrips: async function getTrips() {
        const response = await fetch("http://localhost:3001/api/trips");
        const trips = await response.json();
        return trips;
    },
    // postTrip: postTrip(),
    // updateTrip: updateTrip()
}

export default tripServices