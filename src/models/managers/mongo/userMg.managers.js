import { compareHash, createHash } from "../../../../bcrypt/createHash.js";
import { convertToDto } from "../../dto/user.dto.js";
class UserContainer {
    constructor(dataBase) {
        this.dataBase = dataBase;
    }

    getAll = async () => {
        const response = await this.dataBase.find()
        const newData = JSON.parse(JSON.stringify(response))
        const usersDto = convertToDto(newData)
        return usersDto
    }
    createNewUserPostman = async (user) => {
        try {
            const dato = await this.dataBase.findOne({ email: user.email })
            console.log(dato)
            if (dato != null && dato != "") return ({ message: "El usuario ya existe, por favor intente con otro email" })
            const response = await this.dataBase.create(user)
            const newData = JSON.parse(JSON.stringify(response))
            const usersDto = convertToDto(newData)
            return {
                "messages:": "Se creo el usuario",
                "usuario:": usersDto
            }
        } catch (error) {
            console.log(error)
        }
    }// Fi

}

export { UserContainer }
