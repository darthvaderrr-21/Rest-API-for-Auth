const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')

router.get('/', userController().index)

router.get('/register', userController().register)
router.post('/register', userController().postRegister)

router.get('/login', userController().login)
router.post('/login', userController().postLogin)

router.post('/logout', userController().logout)

router.post('/dashboard', userController().dashboard)

module.exports = router;