const express= require("express");
const {connectToMongoDB}= require("./connect");
const urlRoute=require('./routes/url');
const URL=require('./models/url');
const rateLimit = require('express-rate-limit');

const app= express();
const PORT= 8001;

connectToMongoDB("mongodb://localhost:27017/short-url").then(()=>
console.log("Mongodb connected"));

app.use(express.json())

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, 
    max: 5,
    message: "Too many requests from this IP, please try again after a minute"
});
app.use(limiter);

app.use("/url",urlRoute);

app.get('/:shortId',async (req,res)=>{
    const shortId=req.params.shortId;
    const entry= await URL.findOneAndUpdate({shortId});

    if (!entry) {
        return res.status(404).json({ error: "Short URL not found" });
    }
    if (entry.expiryDate && entry.expiryDate < new Date()) {
        return res.status(410).json({ error: "This URL has expired" });
    }
    
    await URL.findOneAndUpdate({
        shortId
    },{ $push:{
        visits:{
            timestamp: Date.now()
        },
    },
}
);
res.redirect(entry.redirectURL)
})

app.listen(PORT, ()=> console.log(`Server running at PORT:${PORT}`))