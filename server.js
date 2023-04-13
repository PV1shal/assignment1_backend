import app from "./index.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import GeoDAO from "./dao/geoDAO.js";

async function main() {
    dotenv.config();

    const client = new mongodb.MongoClient(
        process.env.GEO_DB_URI
    )

    const port = process.env.PORT || 8000;

    try {
        await client.connect();
        await GeoDAO.injectDB(client);

        app.listen(port, () => {
            console.log('Server is running on port: ' + port);
        })
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
}

main().catch(console.error);