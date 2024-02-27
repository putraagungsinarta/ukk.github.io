const mongoose = require('mongoose');
const {Schema} = mongoose;

const kategoriSchema = new Schema({
    id_kategori: {
        type: Number,
        unique: true
    },
    namaKategori: {
    type: 'string',
    required: true
    }
})

kategoriSchema.pre('save', async function(next) {
    try {
        if (this.isNew) {
            const lastKat= await this.constructor.findOne({}, {}, { sort: { 'id_kategori': -1 } });
            if (lastKat) {
                this.id_kategori = lastKat.id_kategori + 1;
            } else {
                this.id_kategori = 1;
            }
        }
        next();
    } catch (error) {
        next(error);
    }
});

const KategoriModel = mongoose.model('kategori', kategoriSchema, 'kategori');
module.exports = KategoriModel;