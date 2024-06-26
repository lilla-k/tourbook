import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import multer from 'multer'; 
import { addTrip, getTrips, editTrip, deleteTrip, addCity, editCity, deleteCity, addPhoto, editCoverImageId  } from './mongo.js';

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
    return cb(null, 'images'); //destination: images foder
  }, 
  filename: function(req, file, cb) {
    const extension = file.originalname.split('.')[file.originalname.split('.').length - 1];
    return cb(null, `${crypto.randomUUID()}.${extension}`)  //filename: randomId.extension
  },
  
})
const upload = multer({ storage: storageConfig })

app.get('/api/trips', async (req, res) => {
  const trips = await getTrips();
  res.json(trips); 
})

app.post('/api/trips', async (req, res) => {
  const postedTrip = req.body;
  const tripId = await addTrip(postedTrip);
  res.status(201).json({id:tripId});
})

app.put('/api/trips/:tripId', async (req, res) => {
  const updatedTrip = req.body;
  const tripId = req.params.tripId;
  await editTrip(tripId, updatedTrip);
  res.sendStatus(200);
})

app.delete('/api/trips/:tripId', async (req, res) => {
  const tripId = req.params.tripId;
  await deleteTrip(tripId);
  res.sendStatus(200);
})

app.post('/api/trips/:tripId/cities', async (req, res) => {
  const postedCity = req.body;
  postedCity.cityId=crypto.randomUUID()
  const tripId = req.params.tripId;
  await addCity(tripId, postedCity);
  res.status(201).json({cityId: postedCity.cityId});
})

app.put('/api/trips/:tripId/cities/:cityId', async (req, res) => {
  const updatedCity = req.body;
  const tripId = req.params.tripId;
  const cityId = req.params.cityId;
  await editCity(tripId, cityId, updatedCity);
  res.sendStatus(200);
})

app.delete('/api/trips/:tripId/cities/:cityId', async (req, res) => {
  const tripId = req.params.tripId;
  const cityId = req.params.cityId;
  await deleteCity(tripId, cityId);
  res.sendStatus(200);
})

app.use('/images', express.static(path.join(__dirname, 'images')));

app.post('/api/trips/:tripId/images', upload.single('file'), async (req,res) => {
  const tripId = req.params.tripId;
  const uploadedImageFile = req.file;
  const imageId = uploadedImageFile.filename.split('.')[0]
  const { title } = req.body; 
  const { cityId } = req.body; 
  await addPhoto(tripId, { id: imageId, url: uploadedImageFile.path, title: title, cityId: cityId});
  res.status(201).json({id: imageId});
});

app.patch('/api/trips/:tripId', async (req, res) => {
  const {coverImageId} = req.body;
  const tripId = req.params.tripId;
  await editCoverImageId(tripId, coverImageId);
  res.sendStatus(200);
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})