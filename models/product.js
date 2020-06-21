const mongoose=require('mongoose');
const schema=mongoose.Schema;

const productSchema=new schema(
    {
        title:{
            type: String,
            unique: true,
            dropDups: true,
            required: true
        },
        category:{
            type: String,
            required: true
        },
        image:{
            type: String,
            required: true
        },
        price:{
            type: Number,
            required: true
        },
        creator:{
            type:schema.Types.ObjectId,
            required:true,
            ref:'user'
        }
},
{timestamps:true}
);

module.exports=mongoose.model('product',productSchema);