import express from 'express'
import mongoose from'mongoose'
import { getOrignalUrl, shortUrl } from './Controllers/url.js'

const app = express()
app.use(express.urlencoded({ extend: true}));

const url = 'mongodb://localhost:27017/';
mongoose.connect(url,{
    dbName:'Practice-FullStack',
})
.then(()=> console.log('MongoDB Connected.......'))
.catch((err) => console.log('Error :',err));

//rendering ejs file
app.get("/",(req,res)=>{
    res.render('index.ejs',{shortUrl: null});
})

// shortning url - to save url into database
app.post("/short",shortUrl)

//redirect to orignal url
app.get("/:shortCode", getOrignalUrl);

const port = 3000
app.listen(port,() => console.log(`Server is running on port ${port}`))
