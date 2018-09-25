# pruGlobal
Web Crawler

This two-page web application allows to crawl the href link based on supplying a given domain name and number of pages to be visited. First page tasks domain name and the number of pages as input. On submit in same page a button appears, clicking on that, navigates to output page. That basically shows the result in JSON format. Also, that is a "Refresh" button which allows to refresh the page to retrieve more information.

# Design/Development Approach
From technical design perspective, this application has two parts. First, it navigates the links in a recursive way and writes to a file in asynchronous way. Second, an URL has been exposed to show the result which also works asynchronously and display the contents in JSON format.

# Tools & technologies
1. NodeJs
2. EJS
3. Bootstrap 4.0
4. NodeJs modules (cheerio, request, fs, url-parser etc.)
5. Github webhooks for continuous development/deployment.
6. OpenShift Cloud

# Installations
1. Install Node.js version 8+
2. Install Git CLI

# Workspace Setup
  $ git clone https://github.com/sudksing/pruGlobal.git pruGlobal
  
  $ cd pruGlobal
  
  $ npm install
  
# Run the application
  $ npm start 
    or
  $ node server.js
  
  Visit -> 
  http://localhost:8080/
  
 # NOTE for USING this application
 1. Default Values on first pages are;
    II. Enter URL to be Web Crawled: http://www.prudential.co.uk/
    II. Enter number of pages to be Web Crawled: 10
 
  In case of no value supplied to input fields and click on the submit button will show the result of default domain, http://www.prudential.co.uk/ and only 10 pages will be crawled. 

 2.  On Clicking Submit Button on first page, just below to it, another button appears called "Click here to see output!". Clicking on this button navigates to the output page. Where it is required to click of "Refresh" button to get latest crawled contents. It can be kept refreshed until "Call Terminated after navigating 2 pages!!!!" appears at the end of the page.


# Live Application Link
http://wc-pru-global.1d35.starter-us-east-1.openshiftapps.com/

In case if page does not render in first try then press F5 or click Refresh Button. Seems issue with Openshift.

# Limitations
1. Since the program is recursive, it is recommended that do not provide large number of page to be crawled. This application is using in-memory space so there is a chance that on larger number input the performance would degrade there as well could be a chance to go out of memory.
2. First few seconds, the output page may show the blank page so it required to be Refreshed
3. Field validation is not in place so please provide complete URL, for example, http://www.prudential.co.uk/ 


# Future Enhancement
1. Better memory management by introducing middleware such as, MQ
2. Template based crawling 
3. Out can be stored to DB or some files
4. Error Handling, logging, and validation

