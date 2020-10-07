const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const login = require('./routes/login');
const kBase = require('./routes/knowledgeBase');
const cors = require('cors')
const jsonParser = bodyParser.json()
app.use(cors({origin:'*'}))
app.get('/',(req,res) =>{
    res.send("PAGE NOT FOUND")
})

app.use('/login',jsonParser,login);
app.use('/knowledgeBase', jsonParser, kBase)
app.listen('8000',() => {
    console.log("Connected to port 8000")
})