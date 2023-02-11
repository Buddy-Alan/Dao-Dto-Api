
import knex from "knex";
const nameTable = "user"


const createTableUser = async (conexion) => {

    try {
        const dbMysqlConnect = knex(conexion)
        const tablaExist = await dbMysqlConnect.schema.hasTable(nameTable);
        if (!tablaExist) {
            await dbMysqlConnect.schema.createTable(nameTable, table => {
                table.increments("id"),
                    table.string("name", 150).nullable(false),
                    table.string("lastname", 150).nullable(false),
                    table.integer("edad", 5),
                    table.string("email", 150).nullable(false),
                    table.string("password", 550).nullable(false)
                console.log("Tabla User creada correctamente")
            })//cREA LA TABALA USUARIOS
        }

        dbMysqlConnect.destroy();
        console.log("Tabla User ya creda anteriormente")
    } catch (error) {
        console.log(error)
    }
}
export { createTableUser, nameTable }