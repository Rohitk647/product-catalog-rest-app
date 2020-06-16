const mongoose=require('mongoose');
const schema=mongoose.Schema;

const usersSchema=new schema({
    username:{
        type: String,
        unique: true,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type:String,
        unique: true,
        required: true
    }
});

module.exports=mongoose.model('user',usersSchema);