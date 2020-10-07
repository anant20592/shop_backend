const connection = require('../config');
const {
   generateToken,
   verify
   } = require("./jwt")
const {
   encryptPassword,
   decryptPassword
   } = require("./bycrypt");

exports.saveUser = async (data) =>{
   data.password = await encryptPassword(data.password)
   console.log("USER_ ", data.password)
   return  connection.then(async db =>{
     try{  
         let userData = await db.collection('users').insertOne(data)
         return {"status" : 200,
                  "statusText" : "User added"
                  }
     }catch(err){// console.log(err)
         if(err.contains('MongoError: E11000 duplicate key error collection')){
            return {
               "status" : 401,
               "statusText" : "User already exist"
            }
         }
   }
    }).catch(err => {})
}

exports.authorizeUser = async (data) => {
   let userName = data.userName;
   let password = data.password;
   let db = await connection;
   let userData = await db.collection('users').findOne({userName : userName})
      if(userData.userName){
         console.log(userData.userName)
         let result = await decryptPassword(password, userData.password)
         if(result){
            let token = generateToken({name : "anant"})
               return {
                  firstName : userData.firstName,
                  lastName : userData.lastName,
                  token : token
               }
         }else{
               return {
                  status : 401,
                  statusText : "Email or password is incorrect"
               }
         }
      }
}

exports.forgotPassword = async (data) => {
   let userName = data.userName;
   let password = data.password;
   let db = await connection;
   let userData = await db.collection('users').findOne({userName : userName})
   if(userData.userName){
         let encryptedPassword = await encryptPassword(password);
         let newPassword = await db.collection('users').updateOne({"userName" : userName},{$set :{"password" : encryptedPassword}})
         return {
            "status" : 200,
            "statusDescription" : "Password updated"
         }
   }else {
      return {
         "status" : 401,
         "statusText" : "User not found"
      }
   }
}