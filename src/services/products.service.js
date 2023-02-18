import { getApiDato } from "../models/index.models.js"
import { config } from "../config/configDotenv.js"

const { productDaoContainer } = await getApiDato(config.DB)

export const getAllPRoducts = async () => {
    const products = await productDaoContainer.getAll()
    return products
}

export const postSaveProduct = async (producto) => {
    const product = await productDaoContainer.save(producto)
    return product
}

export const deleteProductos = async (idProducto) => {
    const productDelete = await productDaoContainer.deleteByID(idProducto)
    return productDelete
}