import express from 'express';
import cors from 'cors';

import {addTrip} from './mongo.js';

const port = 3001;
const app = express();
app.use(express.json()); 
app.use(cors());

app.get('/api/trips', async (req, res) => {
  // const trips = await getTrips();
  const trips = [{
    startDate: "2024-02-02",
    endDate: "2024-02-06",
    country: "Jordan",
    countryInformation: "Jordan is a country",
    tripExperience: "Jordan experience",
    id: 1
}]
  res.json(trips);
})

app.post('/api/trips', async (req, res) => {
    console.log("post");
    const postedTrip = req.body;
    console.log(postedTrip);
    const result = await addTrip(postedTrip);
    console.log(result);
    res.sendStatus(200);

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