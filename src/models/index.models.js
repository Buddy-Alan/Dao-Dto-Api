import { userModels } from "./dbModels/mongo/userModels.js";
import { MongoClient } from "./clients/dbClientMongo.js";
import { MySqlClient } from "./clients/dbClientMySql.js";
import { createTableUser, nameTable } from "./dbModels/mySql/userModelsMysql.js"
import { config } from "../config/configDotenv.js";
const conexion = {
    client: 'mysql',
    connection: {
        host: config.hostMysql,
        port: config.portMysql,
        user: config.userMysql,
        password: config.passMysql,
        database: config.dbMysql
    }
}


export const getApiDato = async (DB) => {
    let userDaoContainer;
    switch (DB) {
        case 'MYSQL':
            const { UserMySqlDao } = await import("./daos/users/userMysql.js")
            //Si funciona conecta ala BD mysql
            const client = new MySqlClient()
            await client.connectDB()
            await createTableUser(conexion)
            userDaoContainer = new UserMySqlDao(conexion, nameTable)
            break;
        case 'MONGO':
            const { UserMgDao } = await import("./daos/users/userMgDao.js")
            const cliente = new MongoClient();
            await cliente.connect()
            userDaoContainer = new UserMgDao(userModels)
            break;
        default:
            console.log("Ocurrio un error")
            break
    }
    return { userDaoContainer }
}