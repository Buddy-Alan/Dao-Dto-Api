import { getAllUser, postUserPostman } from "../services/user.service.js"

export const getAllUserController = async (req, res) => {
    const allUser = await getAllUser()
    res.json({ usuarios: allUser })
}

export const postUserPostmanController = async (req, res) => {
    const { name, lastname, email, password, edad } = req.body
    console.log(req.body)
    const newUser = {
        "name": name,
        "lastname": lastname,
        "edad": edad,
        "email": email,
        "password": password
    }
    const usuario = await postUserPostman(newUser)
    res.json({ usuario })
}