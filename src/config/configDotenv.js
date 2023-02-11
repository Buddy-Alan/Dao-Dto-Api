import * as dotenv from "dotenv"

//Configuramos Dotenv
dotenv.config({
    path: ".env.development"
})

export const config = {
    BDusuarios: process.env.BaseDeDatosUsuarios || "",
    BDSesiones: process.env.BaseDeDatosSesiones || "",
    claveSesion: process.env.Clave_Sesion,
    Modo: process.env.MODO,
    DB: process.env.DataBase,
    MySql: process.env.MySql,
    dbMysql: process.env.databaseMysql,
    passMysql: process.env.passwordMysql,
    userMysql: process.env.userMysql,
    hostMysql: process.env.hostMysql,
    portMysql: process.env.portMysql,

}