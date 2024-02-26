const express = require('express');
const router = express.Router();
const cors = require('cors');
const controller = require('../controllers/controller');
const cookieParser = require('cookie-parser')

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    }), cookieParser()
)

//get
router.get('/', controller.test)
router.get('/user', controller.allUser)
router.get('/user/:id', controller.userById)
router.get('/profile', controller.userProfile)

//post
router.post('/login', controller.login)
router.post('/register', controller.register)
router.post('/logout', controller.logout)

//put
router.put('/user/:id/update', controller.updateUser)

//delete
router.delete('/user/:id/delete', controller.deleteUser)

module.exports = router;