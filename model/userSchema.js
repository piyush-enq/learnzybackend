const { default: mongoose } = require('mongoose');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const studentSchema = new mongoose.Schema( {
    name: {
    type: String,
    
    },

    email: {
    type: String,
    required: true
    },

    password: {
        type: String,
        
        },

    phone: {
    type: Number,
    
    },
    age: {
        type: Number,
        
        },
    tokens:[
        {
            token:{
                type:String,
                
            }
        }
    ]
})


studentSchema.pre('save',async function (next){
     if(this.isModified('password')){
        
    this.password= await bcrypt.hash(this.password,12);
    }
     next();
 });


 studentSchema.methods.generateAuthToken = async function(){
     try{
         let token = jwt.sign({_id:this._id},process.env.SECRET_KEY);

         this.tokens=this.tokens.concat({token:token});

         await this.save();
         return token;
     } catch{

        console.log("errorg");
     }
 }



const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
