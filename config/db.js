const mongoose = require('mongoose')
require('dotenv').config({path : "./config/dev.env"})

const connectionURL=`mongodb+srv://abuu:${process.env.MONGODB_PASSWORD}@graphql-storybook.uy8j8.mongodb.net/graphql-storybook?retryWrites=true&w=majority`
 
mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const db = mongoose.connection.once('open',()=>{
    console.log("Connected to the db"); 
}) 

 
module.exports=db;
 