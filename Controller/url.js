const shortid = require("shortid");
const URL = require("../Model/url");

const handleGetAnalytics = async (req, res) => {
    try {
        const result = await URL.find({}); 
        console.log(result)
        res.render('analytics', { urls:result }); 
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data');
    }
};

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
   return res.render('Home',{id:shortID})
  return res.json({ id: shortID });
}
module.exports = {handleGenerateShortUrl,handleGetAnalytics}