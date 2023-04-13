import express from 'express';
import cores from 'cors';
import geolocations from './api/geo.route.js';

const app = express();

app.use(cores());
app.use(express.json());

app.use("/api/v1/geoLocations", geolocations);
app.use('*', (req, res) => {
    res.status(400).json({ error: "not found" });
})

export default app;
