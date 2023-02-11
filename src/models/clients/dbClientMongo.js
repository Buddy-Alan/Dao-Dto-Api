import mongoose from "mongoose";
import { logger } from "../../../logger.js";
import { config } from "../../config/configDotenv.js";


class MongoClient {
    constructor() {
        this.client = mongoose
    }

    async connect() {
        try {
            await this.client.connect(config.BDusuarios)
            logger.info("¡Conexion a Mongo Exitosa!")
        }
        catch (err) {
            logger.warn(err)
            throw new Error(`Conexion fallida ${err}`);
        }
    }

    async disconnect() {
        try {
            await this.client.connection.close()
            logger.info("¡Conexion Finalizada!")
        }
        catch (err) {
            logger.warn(err)
            throw new Error(`Conexion fallida ${err}`);
        }
    }
}

export { MongoClient }

// const conectMongo = (urlAIngresar) => {
//     mongoose.connect(urlAIngresar, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     },
//         error => {
//             if (error) throw new Error(`Conexion fallida ${error}`);
//             console.log("¡Conexion a Mongo Exitosa!")
//         })
//     console.log("base de datos conectada")


// }

