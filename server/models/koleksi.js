const mongoose = require("mongoose");
const { Schema } = mongoose;

const koleksiSchema = new Schema({
    id_koleksi: {
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
    }
})

koleksiSchema.pre('save', async function(next) {
    try {
        if (this.isNew) {
            const lastKat= await this.constructor.findOne({}, {}, { sort: { 'id_koleksi': -1 } });
            if (lastKat) {
                this.id_koleksi = lastKat.id_koleksi + 1;
            } else {
                this.id_koleksi = 1;
            }
        }
        next();
    } catch (error) {
        next(error);
    }
});

const koleksiModel = mongoose.model('koleksi', koleksiSchema, 'koleksi')
module.exports = koleksiModel;