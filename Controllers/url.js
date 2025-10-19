import shortid from 'shortid';
import { Url } from '../Models/url.js';


export const shortUrl = async(req,res)=>{
    const longUrl = req.body.longUrl
    const shortCode = shortid.generate();

    console.log("longurl = ".longUrl)
    console.log('shortcode =',shortCode);

    const shortUrl = `http://localhost:3000/${shortCode}`;


    ///Save to database

    const newUrl = new Url({shortCode,longUrl})
    await newUrl.save()

    console.log("Short Url Saved =",newUrl)

    res.render("index.ejs",{ shortUrl});

};

export const getOrignalUrl = async(req,res)=>{
    const shortCode = req.params.shortCode

    ///Find code into database
    const orignalUrl = await Url.findOne({ shortCode});

    if(orignalUrl){
        res.redirect(orignalUrl.longUrl);
    }else {
        res.json({ message: 'Invalid ShortCode'})
    }
}