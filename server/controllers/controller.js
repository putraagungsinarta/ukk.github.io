const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const User = require('../models/user');
const Buku = require('../models/buku');
const Kategori = require('../models/kategori');
const Bukat = require('../models/bukat');
const Koleksi = require('../models/koleksi');
const Pinjam = require('../models/pinjam');
const Ulasan = require('../models/ulasan');
const { hashPassword, comparePassword } = require('../helpers/auth');
const jwt = require('jsonwebtoken');

//controller endpoint
const test = (req, res) => {
    res.json('test is working')
}

const ulasan = async (req, res) => {
    try{
        const { id_user, id_buku, ulasan, rating } =req.body;
        if(!ulasan) {
            return res.json({
                error: 'Mohon Isi Ulasan Terlebih Dahulu'
            })
        }
        if(!rating) {
            return res.json({
                error: 'Mohon Berikan Rating Terlebih Dahulu'
            })
        }
        const ulas = Ulasan.create({
            id_user, id_buku, ulasan, rating
        })

        return res.json('Berhasil Mengirimkan Ulasan', ulas)
    } catch (error) {
        return res.json("Error Dalam Menambahkan Ulasan", error)
    }
}

const koleksi = async (req, res) => {
    try{
        const { id_user, id_buku } = req.body;
        const koleksi = Koleksi.create({
            id_user, id_buku
        })
        return res.json(koleksi)
    } catch (error) {
        return res.status(500).json("There's An Error Occuring In The Backend", error)
    }
}

const pinjam = async (req, res) => {
    try{
        const { id_user, id_buku } = req.body;
        const pinjam = Pinjam.create({
            id_user, id_buku
        })
        return res.json(pinjam)
    } catch(error) {
        return res.status(500).json("There's An Error Occuring In The Backend", error)
    }
}

const kembali = async (req, res) => {
    const pinjamId = req.params.id;
    try {
      const borrowing = await Pinjam.findById(pinjamId);
      if (!borrowing) {
        return res.status(404).json({ error: 'Borrowing entry not found' });
      }
      borrowing.status_pinjam = 'dikembalikan';
      borrowing.tanggal_pengembalian = Date.now();
      await borrowing.save();
      res.status(200).json(borrowing);
    } catch (error) {
      console.error('Error returning book:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

const bukuBaru = async (req, res) => {
    try{
        const { judul, penerbit, tahunterbit, penulis } = req.body;
        if(!judul) {
            return res.json({
                error: 'Mohon Masukkan Judul'
            })
        }
        if(!penerbit) {
            return res.json({
                error: 'Mohon Masukkan Nama Penerbit'
            })
        }
        if(!tahunterbit) {
            return res.json({
                error: 'Mohon Masukkan Tahun Terbit'
            })
        }
        if(!penulis) {
            return res.json({
                error: 'Mohon Masukkan Nama Penulis'
            })
        }
        const buku = Buku.create({judul, penerbit, tahunterbit, penulis})
        return res.status(201).json(buku)
    } catch (error){
        console.error(error)
    }
}

const kategoriBaru = async (req, res) => {
    try{
    const {namaKategori} = req.body;
    if(!namaKategori) {
        return res.json({
            error: 'Masukkan Kategori'
        })
    }
    const sudahAda = await Kategori.findOne({namaKategori});
    if(sudahAda) {
        return res.json({
            error: 'Kategori Sudah Terdaftar'
        })
    }

    const kategori = Kategori.create({
        namaKategori
    })
    return res.json(kategori)
    } catch (error){
        console.error(error)
    }
}

const bukat = async (req, res) => {
    try {
const { id_buku, id_kategori } = req.body;
    const bukats = Bukat.create({
        id_buku, id_kategori
    })
    return res.json(bukats)
    } catch (error) {
        return res.json(error)
    }
}

//login register
const register = async (req, res) => {
    try{
        const {username, email, password, nama_lengkap, alamat, role} = req.body;
        //checker
        if(!username) {
            return res.json({
                error: 'Name Is Required'
            })
        }
        const nExist = await User.findOne({username});
        if(nExist) {
            return res.json({
                error: 'Username Already Exist'
            })
        }
        if(!password || password.length < 6) {
            return res.json({
                error: 'Password Is Required And Must Be Longer Than 6 Characters'
            })
        }
        const exist = await User.findOne({email});
        if(exist) {
            return res.json({
                error: 'Email Already Exist'
            })
        }
        if(!nama_lengkap || nama_lengkap.length < 4){
            return res.json({
                error: 'Masukkan Nama Lengkapmu, Minimal Nama 4 Digit'
            })
        }
        if(!alamat || alamat.length < 6){
            return res.json({
                error: 'Masukkan Alamat Sesuai Dengan Alamatmu'
            })
        }

        const hashedPassword = await hashPassword(password)
        const user = await User.create({
            username, email, password: hashedPassword, role, nama_lengkap, alamat
        })
        await user.save();
        return res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        console.error(error)
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({email});
        if(!user) {
            return res.json({
                error: 'No email found'
            })
        }
        const match = await comparePassword(password, user.password)
        if(match) {
            jwt.sign({ id_user: user.id_user, username: user.username, email : user.email, id: user._id, name: user.name, role : user.role}, process.env.JWT_SECRET, {}, (err, token ) => {
                if(err) throw err;
                res.cookie('token', token).json(user)
        }, { expiresIn: process.env.JWT_EXPIRES_IN})
        }
        if(!match) {
            res.json({
                error: "Password does not match"
            })
        }
    } catch (error) {
        console.log(error);
    }
    }

//fetching data
const allUser = async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
      } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server error' });
      }
}

const allBuku = async (req, res) => {
    try{
        const buku = await Buku.find({});
        res.json(buku);
    } catch (error){
        console.error('Error Fetching Buku:', error)
        res.status(500).json({error: 'Internal Server Error'})
    }
} 

const allKategori = async (req, res) => {
    try{
        const kategori = await Kategori.find({});
        res.json(kategori);
    } catch (error) {
        console.error('Error Fetching Kategori:', error)
        res.status(500).json({error: 'Internal Server Error'})
    }
}

const allPeminjaman = async (er, res) => {
    try{
        const pinjam = await Pinjam.find({})
        res.status(201).json(pinjam)
    } catch (error) {
        console.error('Error fetching pinjaman:', error);
        res.status(500).json({ error: 'Server error' });
    }
}

const userProfile = (req, res) => {
    const {token} = req.cookies
    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if(err) throw err;
            res.json(user)
        })
    } else {
        res.json(null)
    }
    }

const updateUser = async (req, res) => {
        try {
            const { username, email, password } = req.body;
            const userId = req.params.id;
            
            const user = await User.findById(userId);
            
            if (!user) {
                return res.json({ error: 'User not found' });
            }
    
            if (username) {
                user.username = username;
            }
            if (email) {
                user.email = email;
            }
            if (password) {
                user.password = await hashPassword(password);
            }
    
            const users = await user.save();
            
            res.json(users);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Internal Server error' });
        }
    };

//by id endpoint
const userById = async (req, res) => {
        try {
            const userId = req.params.id;
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
              }
              res.status(201).json(user);
          } catch (error) {
              console.error('Error fetching user by ID:', error);
              res.status(500).json({ error: 'Internal Server error' });
          }
      };

const bukuById = async (req, res) => {
        try{
            const bukuId = req.params.id;
            const buku = await Buku.findById(bukuId);
            if (!buku) {
                return res.status(404).json({ error: 'Buku Tidak Ditemukan'})
            }
            res.json(buku)
        } catch (error) {
            console.error('Error fetching buku by ID:', error);
          res.status(500).json({ error: 'Internal Server error' });
        }
      }

//delete endpoint
const deleteUser = async (req, res) => {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            if (!user) {
                return res.json({ error: 'User not found' });
            }
            res.json({ message: 'User deleted successfully' });
        } catch (error) {
            console.error('Error fetching user data and removing it', error);
            res.status(500).json({ error: 'Internal Server error' });
        }
    };

    const deleteBuku = async (req, res) => {
        try{
            const buku = await Buku.findByIdAndDelete(req.params.id);
            if (!buku) {
                return res.json({ error: 'Buku Tidak Ditemukan'})
            }
            res.json({message : 'Buku berhasil dihapus'})
        } catch (error) {
            console.error('Error fetching buku data and removing it', error);
            res.status(500).json({ error: 'Internal Server error' });
        }
    }

const logout = (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
  };

module.exports = {
    test,
    bukuBaru,
    kategoriBaru,
    koleksi,
    ulasan,
    bukat,
    pinjam,
    kembali,
    register,
    login,
    allUser,
    allBuku,
    allPeminjaman,
    allKategori,
    logout,
    userProfile,
    updateUser,
    userById,
    bukuById,
    deleteUser,
    deleteBuku,
}