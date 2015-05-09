var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , session = require('express-session')
  , path = require('path')
  , home = require('./routes/home')
  , mysql = require('mysql');

var app = express();
app.use(express.cookieParser());
app.use(express.session({ secret: 'keyboard cat'}));
// all environments
//app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

 var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
 var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
app.get('/', routes.index);
app.get('/index', routes.index);

app.post('/insertUser', routes.insertUser);

app.post('/addCard', routes.addCard);
app.get('/addCard', routes.addCard);

app.post('/editCard', routes.editCard);
app.get('/editCard', routes.editCard);

//app.get('/signin', home.signin);
app.get('/signin', routes.signin);
app.post('/signin', routes.verify);

app.get('/kanbannew', routes.kanban);

//----Scrum------
app.get('/sprints', home.sprints);
app.get('/getSprints', home.getSprints);
app.get('/getSprintdata', home.getSprintdata);
app.post('/stories', home.getStories);
app.post('/updatescrum', home.updateScrum);
app.get('/burndown', home.gotoCharts);
app.post('/getChartdata', home.getCharts);
//Sprint page 1
app.post('/addback', home.addbacklog);
app.post('/addstory1', home.addstory);

//------Waterfall----------
app.get('/waterfall', home.addProject);
app.get('/task', home.addTask);
app.get('/risk', home.addRisk);
app.get('/percentgraph', home.showGraph);
app.post('/saveproj',home.insertProj);
app.post('/savetask',home.insertTask);
app.post('/saverisk',home.insertRisk);
app.get('/percentcompleted', home.gotoCharts);
app.post('/showgraph', home.showDetails);

/*http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
*/

 http.createServer(app).listen(server_port, server_ip_address, function(){
  console.log('Express server listening on server' +server_ip_address+ ' and port ' + server_port);
});
 
