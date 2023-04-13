import { response } from "express";
import GeoDAO from "../dao/geoDAO.js"

export default class GeoController {
    static async apiGetGeoLocations(req, res, next) {
        try {
            const response = await GeoDAO.getLocations();
            var { error } = response;
            if (error) {
                res.status(500).json({ error: "Unable to get all Locations" });
            } else {
                res.json({ locations: response });
            }
        } catch (error) {
            res.status(500).json({ error: e.message });
        }
    }
    static async apiPostClicks(req, res, next) {
        try {
            console.log(req.body);
            const locClick = req.body.locClick;
            const locClickResponse = await GeoDAO.postLocation(locClick);
            var { error } = locClickResponse;
            if (error) {
                res.status(500).json({ error: "Unable to post clicks" });
            } else {
                res.json({
                    status: "Successfully added clicks",
                    _id: locClickResponse.insertedId
                })
            }
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
}