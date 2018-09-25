
"use strict";
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
    
    //validation Logic
    // if (!url) {   
    //   //TODO - error handeling   
    //   res.render('pages/index',  {errorMsg: "URL is required!!!"});
    // } else {      
       var response = await wcHandler.handleRequest(req, res);
       res.render('pages/index', {result : response});
    //}
    
});

router  
  .post('/output', function (req, res, next) {
    var op = wcHandler.getOutput(req, res);  
    res.render('pages/output', {result: op});
  });

module.exports = router;
