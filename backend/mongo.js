import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';

const uri = "mongodb+srv://tourbook_backend:mncC2YKQH6lHaBGs@cluster0.yjrzlwq.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
export async function addTrip(trip) {
    await client.connect();
    const coll = client.db("tourbook").collection("trips");
    const result = await coll.insertOne(trip);
    await client.close();
    return result.insertedId.toString();
}

export async function addCity(tripId, city) {
  console.log(tripId);
  console.log(city);
  await client.connect();
  const coll = client.db("tourbook").collection("trips");
  await coll.updateOne({_id: new ObjectId(tripId)}, { $push: {visitedCities: city}});
  await client.close();
}

export async function getTrips() {      
  await client.connect();
  const coll = client.db("tourbook").collection("trips");
  const cursor = coll.find({});
  const documents= await cursor.toArray();
  const trips = documents.map(document => {
    const {_id, ...trip} = document; 
    return { id: _id.toString(), ...trip };
  })
  await client.close();
  return trips;
}


