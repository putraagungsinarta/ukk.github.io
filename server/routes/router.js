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
router.get('/buku', controller.allBuku)
router.get('/buku/:id', controller.bukuById)
router.get('/kategori', controller.allKategori)
router.get('/pinjam', controller.allPeminjaman)

//post
router.post('/login', controller.login)
router.post('/register', controller.register)
router.post('/logout', controller.logout)
router.post('/buku', controller.bukuBaru)
router.post('/kategori', controller.kategoriBaru)
router.post('/bukat', controller.bukat)
router.post('/pinjam', controller.pinjam)
router.post('/koleksi', controller.koleksi)
router.post('/ulasan', controller.ulasan)

//put
router.put('/user/:id/update', controller.updateUser)
router.put('/pinjam/:id/return', controller.kembali)

//delete
router.delete('/user/:id/delete', controller.deleteUser)
router.delete('/buku/:Id/delete', controller.deleteBuku)

module.exports = router;