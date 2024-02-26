const express = require('express');
const app = express()
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Database Terhubung'))
.catch((err) => console.log('Database Tidak Terhubung', err))
app.use(express.json({limit: '5mb'}));
app.use(express.urlencoded({extended: false}, {limit: '50mb'}))

app.use('/', require('./routes/router'))
app.use(cors())

const port = 8000;
app.listen(port, () => console.log(`server berjalan di port : ${port}`)) 