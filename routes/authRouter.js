const express = require("express")
const router = express.Router()
const { postRegister, login, logout } = require("./../controllers/authController")

router.post("/admin-webpdesa/register", postRegister)
router.post("/admin-webpdesa/login", login)
router.post("/admin-webpdesa/logout", logout)

module.exports = router
