require('dotenv').config()

const express = require('express');
const User = require('../models/User');
const router = express.Router();    
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middlewares/fetchuser');

// register user
router.post('/register',(req ,res)=>{

    // password encryption
    bcrypt.genSalt(10 ,( e, salt)=>{
        bcrypt.hash( req.body.password , salt,( e, hash)=>{
            req.body.password = hash;
            const user = new User(req.body);

            // commit data to database
            user.save( (e)=>{
                if(e) return res.json( 415 ,{ msg : e } );

                // JWT authentication 
                const data = {
                    user : {
                        id : user.id
                    }
                } 
                res.json( 200);
            } )

        });
    });
});


// login user
router.post( '/login' ,(req ,res)=>{

    const {email ,password} = req.body;
    User.findOne( {email : email} ,(e ,user)=>{
        if(!user) return res.json( 404 ,{ e : "please fill correct username ,password..." } );

        bcrypt.compare( password ,user.password ,(e ,ok)=>{
            if(e || !ok) return res.json(404 ,{ e : "please fill correct username ,password..." });
            
            // JWT authentication 
            const data = {
                user : {
                    id : user._id
                }
            }
            const token = jwt.sign( data ,process.env.JWT_SECRET ,{
                expiresIn : 30*24*60*60           // 1 month remember
            } );
            res.json( 200 ,{ 'auth_token' : token } );
        } );
    } );
})


// fetch user_id
router.post( '/validateuser' ,fetchuser ,async (req ,res)=>{
    const user_id = req.user.id;
    try{
        await User.findById(user_id ,(e ,ok)=>{
            if(e || !ok) return res.json(404);
            res.json(200);
        } );
    }catch(e){
        res.json(403);
    }
} )


module.exports = router;