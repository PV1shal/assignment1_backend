import express from 'express';
import GeoController from './geo.controller.js';

const router = express.Router();

router.route("/").get(GeoController.apiGetGeoLocations);
router.route("/clicks").post(GeoController.apiPostClicks);

export default router;