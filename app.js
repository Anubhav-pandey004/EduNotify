const Express =require('express')
const app= Express()
const cors = require('cors'); 
require('dotenv').config();
const cookieParser = require('cookie-parser'); 
const router = require('./routes/index');
const ConnectDB = require('./config/db')
app.use(cookieParser());

app.use(cors({
    origin: "https://edunotify-automated-student-result.onrender.com",
    credentials: true,
  }));
app.use(Express.json())

app.use("/",router)

ConnectDB().then(()=>{
    app.listen(8080,()=>{
        console.log('server is running on 8080');
    })
})
