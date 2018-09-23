"use strict";

var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');



module.exports = class WebCrawlerHandler{
	constructor(){ }

   async handleRequest(req, res){
       var self = this;	 
	   var urlToNavigateArr = []; 
	   var linkVisited = {}; 
       try{	
		   	var url = new URL(req.body.webCrawledURL);
			urlToNavigateArr.push(req.body.webCrawledURL); 
			await this.traverseNodes(urlToNavigateArr, linkVisited); 

			var response = {result: req.body};
			return response;
       }catch(err){
		   throw err;
	   }	   
   } 

  async traverseNodes (urlToNavigateArr, linkVisited){
	
	var npage = urlToNavigateArr.pop();
	console.log("inside traverseNodes: " + npage);  
	console.log(linkVisited);
	if (npage in linkVisited){
		//Link has alrady been visisted
		console.log(11111111111);
		this.traverseNodes (urlToNavigateArr, linkVisited);
	} else {
		console.log(222222222222);
		await this.navigateLinks(npage, linkVisited, urlToNavigateArr, this.traverseNodes);		
	}

  }  

  async navigateLinks (url, linkVisited, urlToNavigateArr, callback){
	//console.log(linkVisited);	
	console.log(url);	   
	//linkvisited[url] = true;
	console.log("Navigating Page: " + url);

	request(url, async function(error, response, body) {
     // Check status code
	 //console.log('error:', error);
	 //console.log (response);
     console.log("Status code: " + response.statusCode);
     if(response.statusCode !== 200) {
       callback(urlToNavigateArr, linkVisited);
       return;
     } 

	await this.collectLinks($);	
	await callback(urlToNavigateArr, linkVisited);     
  });
}


async collectLinks(urlToNavigateArr, $) {
	var baseUrl = url.protocol + "//" + url.hostname; 
    var relativeLinks = $("a[href^='/']");
    console.log("Found " + relativeLinks.length + " relative links on page");
    relativeLinks.each(function() {
        urlToNavigateArr.push(baseUrl + $(this).attr('href'));
    	});
	}
}
