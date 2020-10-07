const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.encryptPassword = async (password) => {
 return bcrypt.hash(password, saltRounds).then(hash => {
    console.log(hash)
    return hash;
 }).catch(err => {} )
}

exports.decryptPassword = async (password, hash) => {
    return bcrypt.compare(password, hash).then( result => {
        console.log(result)
        return result
    }).catch(err => {});
}