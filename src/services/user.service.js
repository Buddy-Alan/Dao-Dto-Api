// import { UserManager } from "../persistence/index.persistence.js";
import { getApiDato } from "../models/index.models.js"
import { config } from "../config/configDotenv.js"


const { userDaoContainer } = await getApiDato(config.DB)



export const getUserDB = async (idUser, accion) => {

    return await userDaoContainer.getUserById(idUser, accion)
}

export const createUserDB = async (email, nombre, password, accion) => {
    return await userDaoContainer.createUser(email, nombre, password, accion)
}

export const findOneUserDB = async (userName, password, accion) => {
    return userDaoContainer.findOneUser(userName, password, accion)
}

export const getAllUser = async () => {
    const dato = await userDaoContainer.getAll()
    return dato
}

export const postUserPostman = async (user) => {
    const resultado = await userDaoContainer.createNewUserPostman(user)
    return resultado
}