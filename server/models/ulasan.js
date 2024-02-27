const mongoose = require('mongoose');
const {Schema} = mongoose;

const ulasanSchema = new Schema({
    id_ulasan: {
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
    ulasan: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    }
})

ulasanSchema.pre('save', async function(next) {
    try {
        if (this.isNew) {
            const id = await this.constructor.findOne({}, {}, { sort: { 'id_ulasan': -1 } });
            if (id) {
                this.id_ulasan = id.id_ulasan + 1;
            } else {
                this.id_ulasan = 1;
            }
        }
        next();
    } catch (error) {
        next(error);
    }
});

const ulasanModel = mongoose.model('ulasan', ulasanSchema, 'ulasan');
module.exports = ulasanModel;