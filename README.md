# pruGlobal
Web Crawler

This two-page web application allows to crawl the href link based on supplying a given domain name and number of pages to be visited. First page tasks domain name and the number of pages as input. On submit in same page a button appears, clicking on that, navigates to output page. That basically shows the result in JSON format. Also, that is a "Refresh" button which allows to refresh the page to retrieve more information.

# Design/Development Approach:
From technical design perspective, this application has two parts. First, it navigates the links in a recursive way and writes to a file in asynchronous way. Second, an URL has been exposed to show the result which also works asynchronously and display the contents in JSON format.

# Tools & technologies
1. NodeJs
2. EJS
3. NodeJs modules (cheerio, request, fs, url-parser etc.)
4. Github webhooks for continuous development/deployment.
5. OpenShift Cloud

# Build Environment
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

# Live Application Link
http://wc-pru-global.1d35.starter-us-east-1.openshiftapps.com/
