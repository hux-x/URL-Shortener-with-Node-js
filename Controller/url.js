const shortid = require("shortid");
const URL = require("../Model/url");
const ytdl = require('ytdl-core')
const fs = require('fs');
const { error } = require("console");

const handleYoutubeDownload = async(req,res)=>{
console.log('Entered the YouTube download function');
const videoUrl = req.body.url;
try {
  
    let info = await ytdl.getInfo(videoUrl);
    console.log('Downloading:', info.videoDetails.title);

    const videoReadableStream = ytdl(videoUrl, {
        filter: 'audioandvideo',
        quality: 'highest',
        requestOptions: {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
                'Accept-Language': 'en-US,en;q=0.9'
            }
        }
    });
    const videoWritableStream = fs.createWriteStream('C:\\Users\\Hasnain\\Desktop\\Downloads\\video22.mp4');
    videoReadableStream.on('error', (error) => {
        console.error('Error reading the file from the YouTube server:', error.message);
        if (error.message.includes('403')) {
            res.status(403).send('Access forbidden by YouTube server');
        } else {
            res.status(500).send('Error reading the file from the YouTube server');
        }
    });

    videoReadableStream.on('response', (response) => {
        console.log(`Response from YouTube server: ${response.statusCode} ${response.statusMessage}`);
        if (response.statusCode !== 200) {
            console.error('Failed to start download:', response.statusCode, response.statusMessage);
            res.status(500).send('Failed to start download');
        }
    });
    videoWritableStream.on('error', (error) => {
        console.error('Error writing the file to your PC:', error);
        res.status(500).send('Error writing the file to your PC');
    });
    videoWritableStream.on('finish', () => {
        console.log('Download finished');
        res.status(200).send('Download finished');
    });
    videoReadableStream.pipe(videoWritableStream);

    console.log('Download started');
} catch (err) {
    console.error('An error occurred:', err);
    res.status(500).send('An error occurred');
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
  });
   return res.render('Home',{id:shortID})
}
module.exports = {handleGenerateShortUrl,handleRedirect,handleYoutubeDownload}