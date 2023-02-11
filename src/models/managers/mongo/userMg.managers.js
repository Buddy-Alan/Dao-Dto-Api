import { compareHash, createHash } from "../../../../bcrypt/createHash.js";
import { convertToDto } from "../../dto/user.dto.js";
class UserContainer {
    constructor(dataBase) {
        this.dataBase = dataBase;
    }
    //Busca el ID del usuario, con el fin de compararlo con el de la sesion
    getUserById = (idUsuario, accion) => {
        try {
            this.dataBase.findById(idUsuario, (err, userFound) => {
                if (err) return accion(err);
                return accion(null, userFound)
            })
        } catch (err) {
            console.log(err)
        }
    }
    //Busca un usuario en la BD
    findOneUser = async (email, pass, accion) => {
        try {
            this.dataBase.findOne({ userName: email }, async (err, userFound) => {
                console.log(userFound)
                if (err) return accion(err, null, { message: "Hubo un error  al verificar el usuario" })
                if (userFound === null) return accion(err, null, { message: "El usuario y/o contraseña es incorrecta" })
                const passHash = compareHash(pass, userFound.password)
                if (userFound && passHash) {
                    return accion(null, userFound)
                } else {
                    return accion(null, null, { message: "El usuario y/o contraseña es incorrecta" })
                }
            })
        } catch (err) {
            console.log(err)
        }
    }

    //Crear un usuario
    createUser = (email, nombre, password, accion) => {
        this.dataBase.findOne({ userName: email }, (err, userFound) => {
            if (err) return accion(err, null, { message: "Hubo un error al verificar el usuario" })
            if (userFound) return accion(null, null, { message: "El usuario ya existe" })
            const newUser = {
                name: nombre,
                userName: email,
                password: createHash(password)
            }
            this.dataBase.create(newUser, (err, userCreated) => {
                if (err) return accion(err, null, { message: "no se pudo guardar el usuario" })
                accion(null, userCreated)
            })
        })

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
