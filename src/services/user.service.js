// import { UserManager } from "../persistence/index.persistence.js";
import { getApiDato } from "../models/index.models.js"
import { config } from "../config/configDotenv.js"


const { userDaoContainer } = await getApiDato(config.DB)


export const getAllUser = async () => {
    const dato = await userDaoContainer.getAll()
    return dato
}

export const postUserPostman = async (user) => {
    const resultado = await userDaoContainer.createNewUserPostman(user)
    return resultado
}