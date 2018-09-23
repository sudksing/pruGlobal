//  OpenShift sample Node application
var express = require('express'),
    app     = express(),
    morgan  = require('morgan');

var router = express.Router();
var path = require('path');
const bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
    
Object.assign=require('object-assign')

app.engine('html', require('ejs').renderFile);
app.use(morgan('combined'))

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', indexRouter);

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

// app.get('/', function (req, res) {
//     //res.send({app: 'pruGlobal Web Crawler', 'Developed By': 'sudhir Singh'});
//     res.render('view/index.html');
// });

// router.get('/', function (req, res, next) {
//   res.render('view/index.html');
// });

// error handling
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});


app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app ;
