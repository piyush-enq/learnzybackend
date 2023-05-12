const { Router } = require("express");
const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();
const Tutor = require("../model/tutorSchema");
const jwt = require('jsonwebtoken');
const authenticate = require("../middleware/authenticatetutor");


router.use((req, res, next) => {
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true'); // Allow credentials
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });


router.post('/registertutor', async (req, res) => {
    const { name, email, password, phone, age} = req.body;
       console.log(email);
    //    res.json({message:req.body});


    try {
      const tutorExists = await Tutor.findOne({ email: email });

      if (tutorExists) {
         return res.json({ error: "Email already Exist" });
      }

            const tutor = new Tutor({ name, email, password, phone, age });

           

            
            const tutorRegister = await tutor.save();

     if (tutorRegister) {
       
                res.json({ message: "tutor registered successfuly" });
                
     }

 
    } catch (err) {
              console. log(err);
    }

})



router.post('/logintutor', async (req, res) => {
    try
    {
    const { email, password } = req.body;

    if (!email || !password) {
            return res.json({ message: "Plz Filled the data"})
    }

    const tutorLogin = await Tutor.findOne({ email: email });

if(tutorLogin){
    const isMatch = await bcrypt.compare(password,tutorLogin.password);

  

    if(isMatch){

    //  res.json( {message: "tutor Signin Successfully" });
     const token = await tutorLogin.generateAuthToken();
    
     res.cookie("jwtoken",token,{
        
         httpOnly:true
     }).send();

     


    


    }else{ 
        res.json( {message: "invalid credentials" });
    }

}else{
    res.json( {message: "invalid credentials" });
}

   

   } catch (err) {
     console. log(err)}
})




// router.get('/editprofile',authenticate,(req,res)=>{
//     console.log(`hehe bwoi`)
// })



module.exports = router;