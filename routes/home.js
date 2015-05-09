var ejs = require("ejs");
var mysql = require('./mysql');

function insertUser(req,res)
{
	console.log("hi");
	req.session.name=req.param("username");
	var password = req.param("password");
	var preference = req.param("preference");
	
	console.log("session name:"+req.session.name);
	var insertUserQuery="insert into Users (Username, Password, Preference) values ('"+req.param("username")+"', '"+password+"', '"+preference+"')";
	console.log("Query is:"+insertUserQuery);
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			res.render('index', { name: req.param("username") });
		}  
	},insertUserQuery);
}

function verify(req,res)
{
	console.log("hi");
	req.session.name=req.param("username");
	var password = req.param("password");
	
	console.log("session name:"+req.session.name);
	
	var verifyUserQuery="select username, password from Users where Username='"+req.param("username")+"' and Password = '"+req.param("password")+"'";
	console.log("Query is:"+verifyUserQuery);
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.username==req.param("username") && results.password == password){
				res.render('kanban', { name: req.param("username") });}
			else {
				res.render('successInsert');
			}
		}  
	},verifyUserQuery);
}

//-------SCRUM-------------
function sprints(req,res) {

	res.render('sprints');
	/*ejs.renderFile('./views/sprints.ejs',function(err, result) {
	   // render on success
	   if (!err) {
	            res.end(result);
	   }
	   // render or error
	   else {
	            res.end('An error occurred');
	            console.log(err);
	   }
   });*/
}

function getSprints(req,res)
{
	var getbacklogs="select count(*) as sno from scrum where projectname ='project1'";
	console.log("Query is:"+getbacklogs);
	
	mysql.fetchData(function(err,results){
		if(err){
				res.end('An error occurred');;
			}
		else 
		{
			res.send({"sprintCount":JSON.stringify(results)});
		}
	},getbacklogs);
}

function getSprintdata(req,res)
{
	//console.log(req + " " + req.param("projectname"));
	var getbacklogs="select * from scrum where projectname ='project1'";
	console.log("Query is:"+getbacklogs);
	
	mysql.fetchData(function(err,results){
		if(err){
				res.end('An error occurred');;
			}
		else 
		{
			res.send({"sprintdata":JSON.stringify(results)});
		}
	},getbacklogs);
}

function getStories(req,res)
{
	//console.log(req + " " + req.param("sprintselected"));
	var getbacklogs="select * from stories where sprint ='"+req.param("sprintselected")+"'";
	console.log("Query is:"+getbacklogs);
	
	mysql.fetchData(function(err,results){
		if(err){
				res.end('An error occurred');;
			}
		else 
		{
			res.send({"stories":JSON.stringify(results)});
		}
	},getbacklogs);
}

function updateScrum(req,res)
{
	//console.log(req + " " + req.param("sprintselected"));
	var getbacklogs="update scrum set remaininghours = '"+req.param("Hours")+"', status= '"+req.param("Status")+"', velocity= '"+req.param("Velocity")+"', expectedenddate= '"+req.param("NewDate")+"' where sprint = '"+req.param("sprintselected")+"'";
	console.log("Query is:"+getbacklogs);
	
	mysql.fetchData(function(err,results){
		if(err){
				res.end('An error occurred');;
			}
		else 
		{
			res.send({"updated":JSON.stringify(results)});
		}
	},getbacklogs);
}

function gotoCharts(req,res) {

	res.render('burndown');
	/*ejs.renderFile('./views/burndown.ejs',function(err, result) {
	   // render on success
	   if (!err) {
	            res.end(result);
	   }
	   // render or error
	   else {
	            res.end('An error occurred');
	            console.log(err);
	   }
   });*/
}

function getCharts(req,res)
{
	//console.log(req + " " + req.param("sprintselected"));
	var getbacklogs="select startdate, idealenddate, expectedenddate, totalhours from scrum where sprint ='"+req.param("sprintselected")+"' and projectname='"+req.param("projectselected")+"'";
	console.log("Query is:"+getbacklogs);
	
	mysql.fetchData(function(err,results){
		if(err){
				res.end('An error occurred');;
			}
		else 
		{
			res.send({"chartdata":JSON.stringify(results)});
		}
	},getbacklogs);
}

function addbacklog(req, res) {
    // formatting start date

    var startdate = new Date(req.param("start_date"));
    var dd = startdate.getDate();
    var mm = startdate.getMonth() + 1; // January is 0!
    var yyyy = startdate.getFullYear();
    if (dd < 10) {
            dd = '0' + dd
    }
    if (mm < 10) {
           mm = '0' + mm
    }
    var start = yyyy+''+mm+''+dd;
    start.split("",10);
    console.log("Formatted Date-->" + start);
// formatting finish date
    var finishDate = new Date(req.param("end_date"));
    var dd = finishDate.getDate();
    var mm = finishDate.getMonth() + 1; // January is 0!
    var yyyy = finishDate.getFullYear();
    if (dd < 10) {
            dd = '0' + dd
    }
    if (mm < 10) {
            mm = '0' + mm
    }

   var finish = yyyy+''+mm+''+dd;
    finish.split("",10);


	var putSprintData = "insert into scrum values ('" + req.param("n_proj") + "','" + req.param("sprint_no") + "','" + finish + "', '" + start + "','" + req.param("total_hours") + "', '" + req.param("n_res") + "','not started','" + req.param("velocity") + "', '"+ req.param("total_hours") + "','" + req.param("velocity") + "','" + finish + "')";
	console.log("Query is:" + putSprintData);

	mysql.fetchData(function(err, results) {
		if (err) {
			res.end('An error occurred');
			;
		} else {
			res.send({
				"SC" : JSON.stringify(results)
			});
		}
	}, putSprintData);
}

function addstory(req, res) {
		var putStoryData = "insert into stories values ('" + req.param("u_story") + "','" + req.param("name") + "', '" + req.param("sprintno") + "')";
		console.log("Query is:" + putStoryData);

		mysql.fetchData(function(err, results) {
			if (err) {
				res.end('An error occurred');
				;
			} else {
				res.send({
					"SC" : JSON.stringify(results)
				});
			}
	}, putStoryData);
}

//---------Waterfall------------
function addProject(req,res) {

	res.render('waterfall');
	/*ejs.renderFile('./views/waterfall.ejs',function(err, result) {
	   // render on success
	   if (!err) {
	            res.end(result);
	   }
	   // render or error
	   else {
	            res.end('An error occurred');
	            console.log(err);
	   }
   });*/
}

function addTask(req,res) {

	res.render('task');
	/*ejs.renderFile('./views/task.ejs',function(err, result) {
	   // render on success
	   if (!err) {
	            res.end(result);
	   }
	   // render or error
	   else {
	            res.end('An error occurred');
	            console.log(err);
	   }
   });*/
}

function addRisk(req,res) {

	res.render('risk');
	/*ejs.renderFile('./views/risk.ejs',function(err, result) {
	   // render on success
	   if (!err) {
	            res.end(result);
	   }
	   // render or error
	   else {
	            res.end('An error occurred');
	            console.log(err);
	   }
   });*/
}

function showGraph(req,res) {

	res.render('percentgraph');
	/*ejs.renderFile('./views/percentgraph.ejs',function(err, result) {
	   // render on success
	   if (!err) {
	            res.end(result);
	   }
	   // render or error
	   else {
	            res.end('An error occurred');
	            console.log(err);
	   }
   });*/
}

function insertProj(req,res)
{
	//console.log(req + " " + req.param("sprintselected"));
	
	
	// formatting start date
	var startdate = new Date(req.param("ProjStart"));
	var dd = startdate.getDate();
	var mm = startdate.getMonth() + 1; // January is 0!
	var yyyy = startdate.getFullYear();
	if (dd < 10) {
	dd = '0' + dd
	}
	if (mm < 10) {
	mm = '0' + mm
	}
	var start = yyyy+'-'+mm+'-'+dd;
	start.split("",10);
	console.log("Formatted Date-->" + start);

	// formatting finish date
	var finishDate = new Date(req.param("ProjDeadline"));
	var dd = finishDate.getDate();
	var mm = finishDate.getMonth() + 1; // January is 0!
	var yyyy = finishDate.getFullYear();
	if (dd < 10) {
	dd = '0' + dd
	}
	if (mm < 10) {
	mm = '0' + mm
	}
	var finish = yyyy+'-'+mm+'-'+dd;
	finish.split("",10);
	
	var putProj="INSERT into Project (project_name,project_desc,project_client,project_start,project_finish) values('"+req.param("ProjName")+"','"+req.param("ProjDesc")+"','"+req.param("ProjClient")+"','"+start+"','"+finish+"')";
	console.log("Query is:"+putProj);
	
	mysql.fetchData(function(err,results){
		if(err){
				res.end('An error occurred');;
			}
		else 
		{
			res.send({"chartdata":JSON.stringify(results)});
		}
	},putProj);
}


function insertTask(req,res)
{
	
	// formatting start date
	var startdate = new Date(req.param("TaskStart"));
	var dd = startdate.getDate();
	var mm = startdate.getMonth() + 1; // January is 0!
	var yyyy = startdate.getFullYear();
	if (dd < 10) {
	dd = '0' + dd
	}
	if (mm < 10) {
	mm = '0' + mm
	}
	var start = yyyy+'-'+mm+'-'+dd;
	start.split("",10);
	console.log("Formatted Date-->" + start);

	// formatting finish date
	var finishDate = new Date(req.param("TaskDeadline"));
	var dd = finishDate.getDate();
	var mm = finishDate.getMonth() + 1; // January is 0!
	var yyyy = finishDate.getFullYear();
	if (dd < 10) {
	dd = '0' + dd
	}
	if (mm < 10) {
	mm = '0' + mm
	}
	var finish = yyyy+'-'+mm+'-'+dd;
	finish.split("",10);
	
	//calculation of percentage complete
	var dueration = req.param("TaskDue");
	//var total_days_worked = Math.abs(finishDate - startdate) / (24 * 60 * 60 * 1000);
	//var total_weeks = (finishDate.getTimeInMillis() - startdate.getTimeInMillis())/(7 * 24 * 60 * 60 * 1000);
	//var week_count = total_days/7;
	var diff = Math.abs(finishDate - startdate);
	var total_weeks= Math.floor(diff/(7 * 24 * 60 * 60 * 1000));
	var total_time = total_weeks * 40; //Assuming that a person works only 40hrs a week
	var percent_complete = (dueration/total_time)*100;
	console.log("Percent Completed-->" +percent_complete );
	
	var putProj="INSERT into Task (task,duration,start,finish,percent_complete,resource,priority,Project_Name) values('"+req.param("TaskName")+"','"+req.param("TaskDue")+"','"+start+"','"+finish+"','"+percent_complete+"','"+req.param("TaskResource")+"','"+req.param("TaskPriority")+"','"+req.param("ProjName")+"')";
	console.log("Query is:"+putProj);
	
	mysql.fetchData(function(err,results){
		if(err){
				res.end('An error occurred');
			}
		else 
		{
			res.send({"chartdata":JSON.stringify(results)});
		}
	},putProj);
}



function insertRisk(req,res)
{
	var putRisk="INSERT into Risk (project,task,risk,severity) values('"+req.param("ProjectName")+"','"+req.param("TaskName")+"','"+req.param("Risk")+"','"+req.param("Severity")+"')";
	console.log("Query is:"+putRisk);
	
	mysql.fetchData(function(err,results){
		if(err){
				res.end('An error occurred');
			}
		else 
		{
			res.send({"chartdata":JSON.stringify(results)});
		}
	},putRisk);
}


function showDetails(req,res)
{
	var showgraph="select task,percent_complete from Task where Project_Name='"+req.param("ProjectName")+"'";
	console.log("Query is:"+showgraph);
	
	mysql.fetchData(function(err,results){
		if(err){
				res.end('An error occurred');
			}
		else 
		{
			res.send({"chartdata":JSON.stringify(results)});
		}
	},showgraph);
}




exports.signin = function(req, res) {
	res.render('index'); 
	}
	

exports.verify=verify;

exports.insertUser=insertUser;
//----scrum---
exports.sprints=sprints;
exports.getSprints=getSprints;
exports.getSprintdata=getSprintdata;
exports.getStories=getStories;
exports.updateScrum=updateScrum;
exports.gotoCharts=gotoCharts;
exports.getCharts=getCharts;
exports.addbacklog = addbacklog;
exports.addstory = addstory;
//------Waterfall------
exports.addProject=addProject;
exports.addTask=addTask;
exports.addRisk=addRisk;
exports.showGraph=showGraph;
exports.insertProj=insertProj;
exports.insertTask=insertTask;
exports.insertRisk=insertRisk;
exports.showDetails=showDetails;




