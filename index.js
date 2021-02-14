const express =require('express')
const app = express();
require('dotenv').config({ path:'./config/dev.env' })
const http =require('http')
const server = http.createServer(app);
const morgan =require('morgan')
const cors =require('cors')
const path=require('path')

//  middlewares
app.use(express.json())
app.use(cors())
// app.use()

if (process.env.NODE_ENV === 'production') {
    app.use(path.join(__dirname,"/client/build"))
}

const PORT = process.env.PORT || 3005;
server.listen(PORT,console.log(`Server running on port ${PORT}`))