const express = require('express');
const login = express.Router();
const {
    saveUser, 
    authorizeUser, 
    forgotPassword
} = require('../services/login');

login.post('/', (req, res) => {
    let data = req.body;
    saveUser(data).then(data => {
        res.send(data)
    }).catch(err => {
        console.log(err)
    })
})

login.post('/authorize', (req, res) => {
    let data = req.body;
    authorizeUser(data).then(data => {
        console.log("erer- ", data)
        res.status(200).send(data)
    }).catch(err => {
        console.log(err)
        res.status(401).send(err)
    })
})

login.post('/forgotPassword', (req, res) => {
    let data = req.body;
    forgotPassword(data).then(data => {
        console.log("erer- ", data)
        res.status(200).send(data)
    }).catch(err => {
        console.log(err)
        res.status(401).send(err)
    })
})

module.exports = login;