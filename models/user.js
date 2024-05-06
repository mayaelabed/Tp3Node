const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const userShema =new mongoose.Schema({
    Username:{type:String,unique:true},
    password:String
})

userShema.pre('save',async function(next){
    const user=this;
    if(user.isModified('password')){
        user.password=await bcrypt.hash(user.password,10)
    }
    next();
})
const User=mongoose.model('User',userShema)
module.exports=User;