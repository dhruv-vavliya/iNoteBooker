
require('dotenv').config()
const express = require('express');
const path = require('path');
const cors = require('cors');
const mongo_connector = require('./db');

const port = process.env.PORT || 80;
const app = express();
mongo_connector();

app.use(cors());
app.use(express.json());
app.use('/auth' ,require('./routes/auth') );
app.use('/notes' ,require('./routes/notes') );

if(process.env.NODE_ENV === 'production'){
    app.use( express.static( path.join( __dirname ,"client","build")));
    app.get("*" ,(req,res)=>{
        res.sendFile( path.join( __dirname ,"client","build","index.html"));
    })
}

app.listen( port ,()=>{
    console.log(`server started at ${port}....`);
} )

