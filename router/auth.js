const { Router } = require("express");
const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();
const Student = require("../model/userSchema");
const jwt = require('jsonwebtoken');


router.get('/', (req, res) => {
res.send( `Hello world from the server router js`);
});

router.get('/register', (req, res) => {
    res.send( `Hello world from the server router js`);
    });

router.post('/register', async (req, res) => {
    const { name, email, password, phone, age} = req.body;
       console.log(email);
    //    res.json({message:req.body});


    try {
      const userExist = await Student.findOne({ email: email });

      if (userExist) {
         return res.json({ error: "Email already Exist" });
      }

            const user = new Student({ name, email, password, phone, age });

           

            
            const userRegister = await user.save();

     if (userRegister) {
       
                res.json({ message: "User registered successfuly" });
     }


    } catch (err) {
              console. log(err);
    }

})



router.post('/login', async (req, res) => {
    try
    {
    const { email, password } = req.body;

    if (!email || !password) {
            return res.json({ message: "Plz Filled the data"})
    }

    const userLogin = await Student.findOne({ email: email });

if(userLogin){
    const isMatch = await bcrypt.compare(password,userLogin.password);

  

    if(isMatch){

     res.json( {message: "user Signin Successfully" });
     const token = await userLogin.generateAuthToken();

    }else{ 
        res.json( {message: "invalid credentials" });
    }

}else{
    res.json( {message: "invalid credentials" });
}

   

   } catch (err) {
     console. log(err)}
})


router.get('/api/data', async (req, res) => {
    try {
      const name =  req.query.name;// Get the name query parameter
  
      // Fetch data from MongoDB where name is "Sam"
      const data = await Student.findOne({ name: name });
  
      res.json(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Error fetching data' });
    }
  });






module.exports = router;