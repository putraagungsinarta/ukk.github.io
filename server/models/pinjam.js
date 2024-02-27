const mongoose = require('mongoose');
const {Schema} = mongoose;

const pinjamSchema = new Schema({
    id_pinjaman: {
    type: Number,
    unique: true,
    },
    id_buku: {
        type: Number,
        ref: 'buku',
        required: true,
    },
    id_user: {
        type: Number,
        ref: 'user',
        required: true,
    },
    tanggal_pinjam: {
        type: Date,
        default: Date.now,
        required: true,
    },
    tanggal_pengembalian: {
        type: Date,
    },
    status_pinjam: {
        type: String,
        default: 'dipinjam',
        enum: ['dipinjam', 'dikembalikan'],
    }
})

pinjamSchema.pre('save', async function(next) {
    try {
        if (this.isNew) {
            const lastPinjam = await this.constructor.findOne({}, {}, { sort: { 'id_pinjaman': -1 } });
            if (lastPinjam) {
                this.id_pinjaman = lastPinjam.id_pinjaman + 1;
            } else {
                this.id_pinjaman = 1;
            }
        }
        next();
    } catch (error) {
        next(error);
    }
});

const pinjamModel = mongoose.model('pinjaman', pinjamSchema, 'pinjaman');
module.exports = pinjamModel;