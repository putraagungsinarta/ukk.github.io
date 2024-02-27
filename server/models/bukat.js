const mongoose = require('mongoose');
const {Schema} = mongoose;

const bukatSchema = new Schema({
    id_relasi: {
        type: Number,
        unique: true,
    },
    id_buku: {
        type: Number,
        ref: 'buku',
        required: true,
    },
    id_kategori: {
        type: Number,
        ref: 'kategori',
        required: true,
    }
})

bukatSchema.pre('save', async function(next) {
    try {
        if (this.isNew) {
            const lastKat= await this.constructor.findOne({}, {}, { sort: { 'id_relasi': -1 } });
            if (lastKat) {
                this.id_relasi = lastKat.id_relasi + 1;
            } else {
                this.id_relasi = 1;
            }
        }
        next();
    } catch (error) {
        next(error);
    }
});

const bukatModel = mongoose.model('bukat', bukatSchema, 'bukat')
module.exports = bukatModel;