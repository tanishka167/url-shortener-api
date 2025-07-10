const shortid=require("shortid");
const URL=require("../models/url");
const validUrl = require('valid-url');

async function handleGenerateNewShortURL(req,res){
    const body=req.body;
    if(!body.url)return res.status(400).json({error:'url is required'})
    if (!validUrl.isUri(body.url)) {
        return res.status(400).json({ error: 'Invalid URL format' });
    }

    const shortID=shortid();

    await URL.create({
        shortId:shortID,
        redirectURL:body.url,
        visits:[],
        expiryDate: body.expiryDate ? new Date(body.expiryDate) : undefined
    });
    
    return res.json({ shortUrl: `http://localhost:8001/${shortID}` });

}

async function handleGetAnalytics(req,res){
    const shortId=req.params.shortId;
    const result=await URL.findOne({shortId});
    return res.json({
        totalClicks:result.visits.length,
        analystics:result.visits,
    });
}

module.exports={
    handleGenerateNewShortURL,
    handleGetAnalytics,
};