import express from 'express';
import cors from 'cors';

import { addTrip, addCity, getTrips } from './mongo.js';

const port = 3001;
const app = express();
app.use(express.json());
app.use(cors());

app.get('/api/trips', async (req, res) => {
  const trips = await getTrips();
  res.json(trips);
})

app.post('/api/trips', async (req, res) => {
  const postedTrip = req.body;
  const tripId = await addTrip(postedTrip);
  res.status(201).json({id:tripId});


  // if(isValid(postedTrip)){
  //     const result = await addCloth(postedCloth);
  //     if(result){
  //       res.sendStatus(201);
  //     }
  //   res.sendStatus(500);
  //   }
  //   res.sendStatus(400);
})

app.post('/api/:tripId/cities', async (req, res) => {
  const postedCity = req.body;
  const tripId = req.params.tripId;
  await addCity(tripId, postedCity);
  res.sendStatus(201)

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})