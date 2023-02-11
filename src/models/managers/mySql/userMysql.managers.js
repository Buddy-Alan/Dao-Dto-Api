import knex from "knex";
import { createHash, compareHash } from "../../../../bcrypt/createHash.js";
import { convertToDto } from "../../dto/user.dto.js";

class UserMySqlContainer {
    constructor(options, tableName) {
        this.database = knex(options)
        this.tableName = tableName
    }


    createNewUserPostman = async (user) => {
        try {
            const dato = await this.database.from(this.tableName).select("*").where("email", user.email)
            if (dato != "") return ({ message: "El usuario ya existe, por favor intente con otro email" })
            const idUsuarioCreado = await this.database.from(this.tableName).insert(user)
            const usuario = await this.database.from(this.tableName).select("*").where("id", idUsuarioCreado[0])
            const usersDto = convertToDto(usuario)
            return {
                "messages:": "Se creo el usuario",
                "usuario:": usersDto
            }
        } catch (error) {
            console.log(error)
        }
    }// Find el create user


    getAll = async () => {
        try {
            const usuarios = await this.database.from(this.tableName).select("*")
            const usersDto = convertToDto(usuarios)
            return usersDto
        } catch (error) {
            console.log(error)
        }
    }

}

export default UserMySqlContainer
