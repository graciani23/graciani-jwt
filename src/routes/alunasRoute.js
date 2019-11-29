const express = require("express")
const router = express.Router()
const controller = require("../controllers/alunasController")
const authMiddleware = require('../middlewares/auth')

router.get("/", controller.get)
router.post("/", controller.post)
router.use(authMiddleware)// somente a rota / está exposta, para ter acesso as demais é necessário um token válido
router.get("/nasceuSp", controller.getSp)
router.get("/:id", controller.getById)
router.get("/:id/books", controller.getBooks)
router.get("/:id/getAge", controller.getAge)
router.post("/:id/books", controller.postBooks)

module.exports = router
