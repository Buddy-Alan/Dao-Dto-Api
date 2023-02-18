import ContenedorProducts from "../../managers/mongo/products.managers.js"

class ProductMgDao extends ContenedorProducts {
    constructor(model) {
        super(model)
    }
}

export { ProductMgDao } 