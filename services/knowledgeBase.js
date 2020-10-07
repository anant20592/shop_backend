const connection = require('../config');

exports.addCategory = (category) => {
    connection.then(db => {
        db.collection('knowledge_base/categories').insertMany(category);
        console.log(category)
        return {
            status : 200,
            statusText : "Category saved"
        }
    })
}

exports.addSubCategory = (subCategory) => {
    connection
    .then( db => {
        db.collection('knowledge_base/sub_categories').insertMany(subCategory)
    return{
        status : 200,
        statusText : "Sub-category added"
    }
    })
}

exports.getAllCategories = () => {
    return new Promise((resolve,reject ) =>{
        connection.then( async db => {
          db.collection('knowledge_base/categories').find({}).toArray().then(data =>{
              resolve(data)
           //  console.log(data)
         })
            
              //  console.log(categories)
        })
    })

}

exports.getAllSubCategories = (catId) => {
    return new Promise((resolve,reject ) =>{
        connection.then( async db => {
          db.collection('knowledge_base/sub_categories').find({cat_id : Number(catId)}).toArray().then(data =>{
            console.log(data)
              resolve(data)
         })
            
              //  console.log(categories)
        })
    })

}

exports.addProduct = (product) => {
    connection
    .then( db => {
        db.collection('knowledge_base/products').insertOne(product)
        .then( () => {
            return {
                status : 200,
                statusText : 'Product added successfully'
            }
        })
    })
}

exports.getAllProducts = (prodId) => {
    return new Promise((resolve, reject) => {
        connection.then(async db => {
            db.collection('knowledge_base/products').find({subcat_id : Number(prodId)}).toArray().then(data =>{
                resolve(data)
            })
        })
    })

    
}