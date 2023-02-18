import { app } from "../../server.js";
import supertest from "supertest";
import { expect } from "chai";

const request = supertest(app)

describe("Test api productos", () => {

    it("Guarda el producto, solo si el mismo no esta guardado en la base de datos", async () => {
        const response = await request.post("/api/productos").send(
            {
                title: "Cartuchera5",
                price: 6000,
                thumbnail: "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/570/838/products/15082091-51c91811149689c3e916391456271150-1024-1024.webp",
                descripcion: "Cartuchera Fornite",
                stock: 2000,
                codigo: "AA101"
            }
        )
        //LA api tiene un filtro que hace que TODO devuelta estado 200, aunque el body este vacio
        //unicamente devuelve 500 cuadno hay un error en el momento de interactuar con la BD.
        expect(response.status).equal(200)
        expect(response.body.product).to.have.own.property("_id");

    })
    it("Comprueba si puede obtener todos los productos guardados", async () => {
        const response = await request.get("/api/productos")
        expect(response.status).equal(200)
        expect(response.body.products.length).equal(1)
    }
    )
    it("Borra el producto, si existe en la base de datos.", async () => {
        const product = await request.get("/api/productos")
        const id = product.body.products[0]._id
        const response = await request.delete(`/api/productos/${id}`)
        expect(response.status).equal(200)
        expect(response.body.message).equal(`Se elimino el producto de id:${id}`)
    })

    //Crear una prueba para elminiar TODOS LOS PRODUCTOS, para poder trbajar sin problema

});