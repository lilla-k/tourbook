import { MongoClient, ServerApiVersion } from 'mongodb';

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
    return result.insertedId;
}

export async function getTrips() {
  await client.connect();
  const coll = client.db("tourbook").collection("trips");
  const findCursor = coll.find();
  const trips=await findCursor.toArray();
  console.log(trips)
  await client.close();
  return trips;
}