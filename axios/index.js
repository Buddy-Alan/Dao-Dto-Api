import axios from "axios";


const URL = "http://localhost:8081"


const postSaveProduct = async () => {
    try {
        const response = await axios.post(`${URL}/api/productos`, {
            title: "Cartuchera",
            price: 6000,
            thumbnail: "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/570/838/products/15082091-51c91811149689c3e916391456271150-1024-1024.webp",
            descripcion: "Cartuchera Fornite",
            stock: 2000,
            codigo: "AA101"
        })
        console.log(`Se crea el producto: ${response.data.product.title}, por post`)
        console.log("La respuesta del metodo post es: ")
        console.log(response.data)
    }
    catch (error) {
        console.log(error)
    }
}

const getProducts = async () => {
    try {
        const response = await axios.get(`${URL}/api/productos`)
        console.log("Se utiliza el metodo Get para obtener productos y devuelve: ")
        console.log(response.data)
        return response.data
    }
    catch (err) {
        console.log(err)
    }
}

const deleteProduct = async () => {
    try {
        const producto = await getProducts()
        const id = producto.products[0]._id
        const response = await axios.delete(`${URL}/api/productos/${id}`)
        console.log("Se utiliza el metodo Delete para borrar el producto creado y devuelve: ")
        console.log(response.data)
    } catch (er) {
        console.log(er)
    }
}
postSaveProduct()
getProducts()
deleteProduct()