"use strict";

var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');
const fs = require('fs');



module.exports = class WebCrawlerHandler{
	constructor(){ }

   getOutput(req, res){	  
		var url = req.protocol+'://'+req.get('host')+'/crawl.json';		
		
		fs.readFile('crawl.json',  'utf8', (err, data) => {  
    	if (err) throw err; 
			this.content = data;			
		});

		return this.processfile();			
   		}
	
	processfile(){
			return this.content;
		}

  

   async handleRequest(req, res){
       var self = this;	 
	   var urlToNavigateArr = []; 
	   var linkVisited = {}; 
	   var responseStructure = {};
       try{	
		   var result;		   	
			urlToNavigateArr.push(req.body.webCrawledURL); 			
			result = await self.traverseNodes(self, urlToNavigateArr, linkVisited, responseStructure);			
			if (result == 'success'){
				var response = {result: responseStructure};
			} 			
			return response;
       }catch(err){
		   throw err;
	   }	   
   } 

  async traverseNodes (self, urlToNavigateArr, linkVisited, responseStructure){
	
	var npage = urlToNavigateArr.pop();

	if (npage in linkVisited){
		//Link has alrady been visisted		
		self.traverseNodes (self, urlToNavigateArr, linkVisited, responseStructure);
	} else {		
		responseStructure[npage] = [];
		await self.navigateLinks(self, npage, linkVisited, urlToNavigateArr, responseStructure, self.traverseNodes);		
		
		}
	return 'success';
  }  



  async navigateLinks (self, url, linkVisited, urlToNavigateArr, responseStructure, callback){
	
	linkVisited[url] = true;	
	//console.log("Navigating Page: " + url);
	if (url.includes('pdf') || url.includes('zip') || url.includes('xls') || url.includes('doc')){
		callback(self, urlToNavigateArr, linkVisited, responseStructure);
       return;
	}	
	setTimeout(function(){
		request(url, async function(error, response, body) {
     // Check status code
	 
	 if (error){
		  console.log('error:', error);		 
	 }
	
     if(response.statusCode !== 200) {
       callback(self, urlToNavigateArr, linkVisited, responseStructure);
       return;
     } 

	 // Parse the body
     var $ = cheerio.load(body);
	 await self.collectLinks(url, urlToNavigateArr, responseStructure, $);	 
	 //console.log(responseStructure);
	 callback(self, urlToNavigateArr, linkVisited, responseStructure);	      
  });
	}, 2000);
	
}


async collectLinks(url, urlToNavigateArr, responseStructure, $) {	
	var url1 = new URL(url);
	var baseUrl = url1.protocol + "//" + url1.hostname; 
    var relativeLinks = $("a[href^='/']");    
    relativeLinks.each(function() {
        urlToNavigateArr.push(baseUrl + $(this).attr('href'));	
		responseStructure[url].push(baseUrl + $(this).attr('href'));
    	});	
	
	const content = JSON.stringify(responseStructure);

	fs.writeFile("crawl.json", content, 'utf8', function (err) {
		if (err) {
			return console.log(err);
		}		
	}); 		
	}
}
