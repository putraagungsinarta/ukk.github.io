const mongoose = require('mongoose');
const {Schema} = mongoose

const penggunaSchema = new Schema({
    id_user: {
        type: Number,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    nama_lengkap: {
        type: String,
        required: true
    },
    alamat: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user',
        required: true
    }
})

penggunaSchema.pre('save', async function(next) {
    try {
        if (this.isNew) {
            const lastUser = await this.constructor.findOne({}, {}, { sort: { 'id_user': -1 } });
            if (lastUser) {
                this.id_user = lastUser.id_user + 1;
            } else {
                this.id_user = 1;
            }
        }
        next();
    } catch (error) {
        next(error);
    }
});

const UserModel = mongoose.model('user', penggunaSchema);
module.exports = UserModel;