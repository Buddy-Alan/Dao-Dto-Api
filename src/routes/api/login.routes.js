import { Router } from "express";

import * as controller from "../../controllers/login.controllers.js";
const login = Router()


login.get("/allUser", controller.getAllUserController)

login.post("/api/create", controller.postUserPostmanController)

export default login
