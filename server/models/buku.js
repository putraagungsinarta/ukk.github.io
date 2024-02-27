const mongoose = require('mongoose')
const {Schema} = mongoose

const bukuSchema = new Schema({
    id_buku: {
        type: Number,
        unique: true
    },
    judul: {
        type: 'string',
        required: true
    },
    penulis: {
        type: 'string',
        required: true
    },
    penerbit: {
        type: 'string',
        required: true
    },
    tahunterbit: {
        type: 'string',
        required: true
    }
})

bukuSchema.pre('save', async function(next) {
    try {
        if (this.isNew) {
            const lastBuku = await this.constructor.findOne({}, {}, { sort: { 'id_buku': -1 } });
            if (lastBuku) {
                this.id_buku = lastBuku.id_buku + 1;
            } else {
                this.id_buku = 1;
            }
        }
        next();
    } catch (error) {
        next(error);
    }
});

const BukuModel = mongoose.model('buku', bukuSchema, 'buku')
module.exports = BukuModel;