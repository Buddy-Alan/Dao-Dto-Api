import express from "express";
const router = express.Router()
import login from "./api/login.routes.js";
import random from "./api/randomNmr.routes.js";
import info from "./api/info.routes.js";
import { productRout } from "./api/routerProducts.routes.js";

router.use("/", login);
router.use("/api/productos", productRout);
router.use("/", info)
router.use("/", random)

export { router as apiRouter }