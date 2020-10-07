const jwt = require('jsonwebtoken');

exports.generateToken = (data) => {
    let token = jwt.sign(data,"anant12345" , {expiresIn : 60 * 60})
    return token
}

exports.verify = (token) => {
    let decode = jwt.verify(token, "anant12345")
    return decode.name
}