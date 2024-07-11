const shortid = require("shortid");
const URL = require("../Model/url");
const handleGetAnalytics = async (req,res)=>{
    const id = req.params.id
    const result = await URL.findOne({id})
    res.json(result.visitHistory.length)
}
const handleGenerateShortUrl = async (req, res)=> {
  const body = req.body;
  if (!body.url){
    return res.status(400).json({ error: "url is required" });
  }
  const shortID = shortid();

  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });

  return res.json({ id: shortID });
}
module.exports = {handleGenerateShortUrl,handleGetAnalytics}