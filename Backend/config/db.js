const mongoose =require('mongoose');
require('dotenv').config();
const connectDb = async () => {
  try{
    await mongoose.connect(process.env.MONGO_URI,{
      useNewUrlParser:true,
      useUnifiedTopology:true
    });
    console.log('MongoDB is connected');
  }
  catch(error){
    console.log('Error:',error);
  }
};
module.exports = connectDb;