const MongoClient = require('mongodb').MongoClient;
 
// Connection URL
const url = 'mongodb+srv://anant1:Admin@123@cluster553.oap06.gcp.mongodb.net/test';
 
// Database Name
const dbName = 'workout';

const client = new MongoClient(url, {useUnifiedTopology: true})
const connection = client.connect().then(() =>{
    const db = client.db('workout')
    console.log("Connected to db")
    return db;
})
module.exports = connection
