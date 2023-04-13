import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let location;

export default class GeoDAO {
    static async injectDB(conn) {
        if (location) {
            return;
        }
        try {
            location = await conn.db(process.env.GEO_NS).collection('location');
        } catch (e) {
            console.error(`Unable to connect into LocationDAO: ${e}`);
        }
    }

    static async getLocations() {
        try {
            return await location.find().toArray();
        } catch (e) {
            console.error(`unable to get locations, ${e}`);
        }
    }

    static async postLocation(locClick) {
        try {
            const existingLocation = await location.findOne({ lat: locClick.lat, long: locClick.long });
            if (existingLocation) {
                const updatedClicks = existingLocation.clicks + locClick.clicks;
                await location.updateOne({ _id: existingLocation._id }, { $set: { clicks: updatedClicks } });
                return { message: "Location updated successfully" };
            } else {
                const locationDoc = {
                    lat: locClick.lat,
                    long: locClick.long,
                    clicks: locClick.clicks
                }
                await location.insertOne(locationDoc);
                return { message: "New location created successfully" };
            }
        } catch (e) {
            console.error(`Unable to create new Location ${e}`);
            return { error: e };
        }
    }

}