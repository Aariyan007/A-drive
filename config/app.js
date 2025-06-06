const express = require('express');
const userRouter = require('./routes/user.routes.js')
const indexRouter = require('./routes/index.routes.js')
const dotenv = require('dotenv');
dotenv.config();
const connectToDb = require('./config/db.js')
connectToDb();
const cookieparser = require('cookie-parser')
const app = express();

app.set('view engine','ejs');
app.use(cookieparser());
app.use(express.urlencoded({extended : true}));
app.use(express.json())


app.use('/',indexRouter)
app.use('/user',userRouter)

app.listen(3000,()=>{
    console.log("App running on Port 3000")
})