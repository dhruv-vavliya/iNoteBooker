
require('dotenv').config()
const jwt = require('jsonwebtoken');

const fetchuser = (req ,res ,next)=>{
    const token = req.header( process.env.TOKEN_HEADER_KEY );
    if( !token ) return res.json(403 ,{e : "access denied"} );
    
    try{
        jwt.verify(token ,process.env.JWT_SECRET ,(e ,data)=>{
            if(e) return res.json(403 ,{e : "access denied"} );
            req.user = data.user;
            next();
        } );
    }catch(e){
        res.json(403 ,{e : "access denied"} );
    }
}

module.exports = fetchuser;