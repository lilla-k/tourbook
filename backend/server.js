import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import multer from 'multer'; 
import { addTrip, getTrips, editTrip, addCity, addPhoto  } from './mongo.js';

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

app.post('/api/trips/:tripId/cities', async (req, res) => {
  const postedCity = req.body;
  const tripId = req.params.tripId;
  await addCity(tripId, postedCity);
  res.sendStatus(201);
})

app.use('/images', express.static(path.join(__dirname, 'images')));

app.post('/api/trips/:tripId/images', upload.single('file'), async (req,res) => {
  const tripId = req.params.tripId;
  const uploadedImageFile = req.file;
  const imageId = uploadedImageFile.filename.split('.')[0]
  const { title } = req.body;
  await addPhoto(tripId, { id: imageId, url: uploadedImageFile.path, title: title});
  res.status(201).json({id: imageId});
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})