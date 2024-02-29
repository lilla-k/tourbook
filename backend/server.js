import express from 'express';
import cors from 'cors';

import { addTrip, getTrips } from './mongo.js';

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
  console.log(tripId);
  res.json(tripId);


  // if(isValid(postedTrip)){
  //     const result = await addCloth(postedCloth);
  //     if(result){
  //       res.sendStatus(201);
  //     }
  //   res.sendStatus(500);
  //   }
  //   res.sendStatus(400);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})