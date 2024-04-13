import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import multer from 'multer';  //multer automatically gives that file a unique id

import { addTrip, addCity, addPhoto, getTrips, updateTrip } from './mongo.js';

const port = 3001;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log("server");
console.log(__dirname);
app.use(express.json());
app.use(cors());

const storageConfig = multer.diskStorage({
  destination: function(req, file, cb){
    return cb(null, 'images');
  }, 
  filename: function(req, file, cb){
    return cb(null, Date.now() + "_" + file.originalname)          //with extension
  },
})
const upload = multer({ storage: storageConfig })

app.get('/api/trips', async (req, res) => {
  const trips = await getTrips();
  res.json(trips);         //trips vagy üres array
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
  res.sendStatus(201);
})

app.post('/api/:tripId/photos', async (req, res) => {
  const postedPhoto = req.body;
  const tripId = req.params.tripId;
  await addPhoto(tripId, postedPhoto);
  res.sendStatus(201);
})

app.put('/api/:tripId', async (req, res) => {
  const updatedTrip = req.body;
  const tripId = req.params.tripId;
  await updateTrip(tripId, updatedTrip);
  res.sendStatus(200);
})

app.post('/api/:tripId/upload', upload.single('file'), (req,res) => {
  const uploadedImageFile = req.file;
  console.log(uploadedImageFile)           //filename, path
  res.status(201).json(uploadedImageFile.path);
})

app.use('/images', express.static(path.join(__dirname, 'images')));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})