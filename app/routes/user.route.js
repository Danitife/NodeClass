const {Router} = require('express')
const createUser = require('../controllers/user.controller');

const router = Router()

router.get("/users", createUser.createUser)

module.exports = router