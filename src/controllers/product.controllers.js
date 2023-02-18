import { getAllPRoducts, postSaveProduct, deleteProductos } from "../services/products.service.js";
import { logger } from "../../logger.js";

export const getAllProductsControllers = async (req, res) => {
    try {
        const productosAMostrar = await getAllPRoducts()
        if (productosAMostrar == "" || productosAMostrar == 1) {
            res.status(200).json({
                message: "El archivo esta vacio"
            })
        } else if (productosAMostrar == 2) {
            res.status(200).json({
                message: "El archivo no existe"
            })
        }
        else {
            res.status(200).json({ products: productosAMostrar })
        }

    } catch (error) {
        res.status(500).send("Hubo un error en el Servidor")
    }
}


export const postSaveProductControllers = async (req, res) => {

    const newProduct = req.body;
    try {
        const productoAAgregar = await postSaveProduct(req.body)
        if (productoAAgregar == 1) {
            res.status(200).json({
                message: "No se completaron los datos de manera correcta"
            })
        } else if (productoAAgregar == 2) {
            res.status(200).json({
                message: `El producto con  titulo ${newProduct.title}, ya existe, por favor no repita productos`
            })
        }
        else {
            res.status(200).json({
                message: "Producto Agregado con exito!",
                product: productoAAgregar
            })
        }

    } catch (error) {
        logger.error(error)
        res.status(500).send("Hubo un error en el Servidor")
    }
}

export const deleteProductControlleres = async (req, res) => {
    const { id } = req.params
    try {
        const productoAEliminar = await deleteProductos(id)
        res.status(200).json({
            message: productoAEliminar
        })
    } catch (error) {
        logger.error(error)
        res.status(500).send("Hubo un error en el Servidor")
    }
}