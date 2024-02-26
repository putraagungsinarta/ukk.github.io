const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const User = require('../models/user');
const { hashPassword, comparePassword } = require('../helpers/auth');
const jwt = require('jsonwebtoken');

//controller endpoint
const test = (req, res) => {
    res.json('test is working')
}

//login
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
            jwt.sign({ username: user.username, email : user.email, id: user._id, name: user.name, role : user.role}, process.env.JWT_SECRET, {}, (err, token ) => {
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

const allUser = async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
      } catch (error) {
        console.error('Error fetching users:', error);
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
            return res.status(500).json({ error: 'Server error' });
        }
    };

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
              res.status(500).json({ error: 'Server error' });
          }
      };

const deleteUser = async (req, res) => {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            if (!user) {
                return res.json({ error: 'User not found' });
            }
            res.json({ message: 'User deleted successfully' });
        } catch (error) {
            console.error('Error fetching user data and removing it', error);
            res.status(500).json({ error: 'Server error' });
        }
    };

const logout = (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
  };

module.exports = {
    test,
    register,
    login,
    allUser,
    logout,
    userProfile,
    updateUser,
    userById,
    deleteUser,
}