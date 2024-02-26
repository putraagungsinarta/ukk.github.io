const bcrypt = require('bcrypt')
const crypto = require('crypto')

const generateRandomString = (length) => {
  return crypto.randomBytes(length).toString('hex');
};
const myCode = generateRandomString(32);

const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(12, (err, salt) => {
            if(err) {
                reject(err)
            }
            bcrypt.hash(password, salt, (err, hash) => {
                if(err) {
                    reject(err)
                }
                resolve(hash)
            })
        })
    })
}

const comparePassword = (password, hashed) => {
    return bcrypt.compare(password, hashed)
}

module.exports = {
    hashPassword,
    comparePassword,
    myCode
}