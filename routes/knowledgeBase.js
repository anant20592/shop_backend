const express = require('express');
const KBase = express.Router();
var multer  = require('multer')
//var upload = multer({ dest: 'uploads/' })

const {
    addCategory,
    addSubCategory,
    getAllCategories,
    getAllSubCategories,
    addProduct,
    getAllProducts
} = require('../services/knowledgeBase');

KBase.post('/category',(req,res) =>{
    addCategory(req.body)
    res.send({
        status : 200,
        statusText : "Category added"
    })
})

KBase.post('/subcategory', (req ,res) => {
    addSubCategory(req.body)
    res.send({
        status : 200,
        statusText : "Sub category added"
    })
})

KBase.get('/getAllCategories' , (req, res) => {
    getAllCategories()
    .then( (data) => {
        res.send({
            status : 200,
            data : data
        })
    })
})

KBase.get('/getAllSubCategories', (req,res) => {
    console.log(req.query.cat_id)
    getAllSubCategories(req.query.cat_id)
    .then( data =>{
        res.send({
            status : 200,
            data : data
        })
    })
})
var upload = multer({ storage: storage })
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(req)
      cb(null, 'uploads/')
    }
  })
KBase.post('/addProduct', upload.single('avatar'),(req,res) => {
    console.log("Adding product" , req.body)
    addProduct(req.body)
    res.status(200).send('Product added successfully')
})

KBase.get('/getAllProducts', (req,res) =>{
    console.log("Fetching products" , req.query.cat_id)
    getAllProducts(req.query.cat_id)
    .then( (data) => {
        res.send( {
            status : 200,
            data : data 
        })
    })
})
module.exports = KBase