const router = require("express").Router()
const {registerUser,LoginUser} = require("../controllers/authControllers")


router.post("/register",registerUser)
router.post("/login",LoginUser)

module.exports = router