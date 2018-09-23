var express = require('express');
var router = express.Router();
var WebCrawlerHandler = require ('../lib/WebCrawlerHandler');
var wcHandler = new WebCrawlerHandler();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('pages/index');
});

router
  .get('/webCrawl', function (req, res, next) {
    res.render('pages/index');
  })
  .post('/webCrawl', async function (req, res, next) {
    console.log("inside /webCrawler");
    var url = req.body.webCrawledURL;
    console.log("UrL: " + url);
    if (!url) {   
      //TODO - error handeling   
      res.render('pages/index',  {errorMsg: "URL is required!!!"});
    } else {
      console.log(req.body);
       var response = await wcHandler.handleRequest(req, res);
       res.render('pages/index', {result : response});
    }
    
});


module.exports = router;
