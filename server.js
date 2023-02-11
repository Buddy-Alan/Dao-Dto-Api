import express from "express";
import { Server } from "socket.io"
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { config } from "./src/config/configDotenv.js"
import { logger } from "./logger.js";
import { apiRouter } from "./src/routes/index.js";

// const PORT = objtArguments.PORT && objtArguments.PORT != true ? objtArguments.PORT : 8080
const puerto = process.env.PORT || 8080;
//URL Mongo Atlas
const url = "mongodb://127.0.0.1:27017/chatMongo"//URL local
// const usuariosDB = config.BDusuarios
const sessionsDB = config.BDSesiones
// const claseChats = contenedorDaoChat
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

const server = app.listen(puerto, () => {
    console.log(`server on port ${puerto} en el modo, ${config.Modo}, en el proceso ${process.pid}`)
})



const io = new Server(server)
//Schema normalizr


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Rutas
app.use("/", apiRouter)
app.use(express.static(__dirname + "/src/views/layouts"))
app.get("*", (req, res) => {
    logger.warn(`Se intento ingresar al a ruta ${req.path}`)
})


