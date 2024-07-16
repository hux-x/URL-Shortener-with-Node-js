const shortid = require("shortid");
const URL = require("../Model/url");
const ytdl = require('ytdl-core')
const fs = require('fs');
const { error } = require("console");

const handleYoutubeDownload = async(req,res)=>{
    const outputPath = "C:\\Users\\Hasnain\\Desktop\\Downloads\\video.mp4"
    try {
      const info = await ytdl.getInfo(req.body.url);

      console.log(`Downloading: ${info.videoDetails.title}`);
  
      ytdl(req.body.url, { quality: 'lowest' })
          .pipe(fs.createWriteStream(outputPath))
          .on('finish', () => {
              console.log('Video downloaded successfully');
          })
          .on('error', (err) => {
              console.error('Error downloading video:', err);
          });
  } catch (err) {
      console.error('Error fetching video info:', err);
  }
};

const handleRedirect = async(req,res)=>{
  let shortID = req.params.id
const OGentry =  await URL.findOneAndUpdate({shortId:shortID},{$push:{visitHistory: {timestamp: Date.now()}}})
res.redirect(OGentry.redirectURL);
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
    createBy: req.user._id
  });
   return res.render('Home',{id:shortID})
}
module.exports = {handleGenerateShortUrl,handleRedirect,handleYoutubeDownload}