
/*
 * GET home page.
 */
var ejs = require("ejs");
var mysql = require('./mysql');


exports.index = function(req, res){
  res.render('index');
};

exports.kanban = function(req, res){
	req.session.name=req.param("username");
	  res.render('kanbannew', {name: req.session("username")});
	};

function insertUser(req,res)
{
	console.log("hi");
	req.session.name=req.param("username");
	var password = req.param("password");
	var preference = req.param("preference");
	
	console.log("session name:"+req.session.name);
	var insertUserQuery="insert into TENANT (Username, Password1, Preference) values ('"+req.param("username")+"', '"+password+"', '"+preference+"')";
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

 exports.verify = function (req,res)
{
	req.session.name=req.param("username");
	var password1 = req.param("password");
	
	console.log("session name:"+req.session.name);
	
	var verifyUserQuery="select username, password1, preference from TENANT where Username='"+req.param("username")+"' and Password1 = '"+req.param("password")+"'";
	console.log("Query is:"+verifyUserQuery);
	
	mysql.fetchData(function(err,tables, results){
		if(err){
			res.render('index');
		}
		else 
		{
			if(tables.length>0){
				var username = tables[0].username;
				var password = tables[0].password1;
				
				if(username==req.param("username") && password == password1)
				{
					if(tables[0].preference == "kanban")
						{
						var RTSQuery="SELECT  Max(CASE WHEN TME.EXTENSION_ID = '553' THEN EXT.value END) NC_TITLE, Max(CASE WHEN TME.EXTENSION_ID = '554' THEN EXT.value END) NC_DESC, Max(CASE WHEN TME.EXTENSION_ID = '555' THEN EXT.value END) RTS_TITLE, Max(CASE WHEN TME.EXTENSION_ID = '556' THEN EXT.value END) RTS_DESC,  Max(CASE WHEN TME.EXTENSION_ID = '559' THEN EXT.value END) RFR_TITLE,  Max(CASE WHEN TME.EXTENSION_ID = '560' THEN EXT.value END) RFR_DESC,  Max(CASE WHEN TME.EXTENSION_ID = '557' THEN EXT.value END) IP_TITLE,  Max(CASE WHEN TME.EXTENSION_ID = '558' THEN EXT.value END) IP_DESC,  Max(CASE WHEN TME.EXTENSION_ID = '561' THEN EXT.value END) RF_TITLE,  Max(CASE WHEN TME.EXTENSION_ID = '562' THEN EXT.value END) RF_DESC,  Max(CASE WHEN TME.EXTENSION_ID = '565' THEN EXT.value END) RTS_TITLE1, Max(CASE WHEN TME.EXTENSION_ID = '566' THEN EXT.value END) RTS_DESC1,  Max(CASE WHEN TME.EXTENSION_ID = '569' THEN EXT.value END) RFR_TITLE1,  Max(CASE WHEN TME.EXTENSION_ID = '568' THEN EXT.value END) RFR_DESC1,  Max(CASE WHEN TME.EXTENSION_ID = '567' THEN EXT.value END) IP_TITLE1,  Max(CASE WHEN TME.EXTENSION_ID = '570' THEN EXT.value END) IP_DESC1,  Max(CASE WHEN TME.EXTENSION_ID = '571' THEN EXT.value END) RF_TITLE1,  Max(CASE WHEN TME.EXTENSION_ID = '572' THEN EXT.value END) RF_DESC1,  Max(CASE WHEN TME.EXTENSION_ID = '573' THEN EXT.value END) RTS_TITLE2, Max(CASE WHEN TME.EXTENSION_ID = '574' THEN EXT.value END) RTS_DESC2, Max(CASE WHEN TME.EXTENSION_ID = '575' THEN EXT.value END) IP_TITLE2,  Max(CASE WHEN TME.EXTENSION_ID = '576' THEN EXT.value END) IP_DESC2, Count(CASE WHEN TME.EXTENSION_ID IN ('555', '565', '573') THEN EXT.value END) Count_RTS_TITLE,  Count(CASE WHEN TME.EXTENSION_ID IN ('559', '569') THEN EXT.value END) Count_RFR_TITLE,  Count(CASE WHEN TME.EXTENSION_ID IN ('557', '567', '575') THEN EXT.value END) Count_IP_TITLE, Count(CASE WHEN TME.EXTENSION_ID IN ('561', '571') THEN EXT.value END) Count_RF_TITLE   FROM TENANTDATAEXTENSION EXT, TENANTMETADATAEXTENSION TME  WHERE TME.EXTENSION_ID = EXT.EXTENSION_ID";
						console.log("Query is:"+RTSQuery);
						mysql.fetchData(function(err, tables, results){
							console.log (tables);
							if ( !err ) { 
								res.render('kanbannew', {
									"tablelist" : tables, name: username						
								 });
								
							} else {
							   res.send("error occurred " + err.message);
							}	
						},RTSQuery);
						}
					else if(tables[0].preference == "scrum")
						res.render('scrum', { name: username});
					else if(tables[0].preference == "waterfall")
						res.render('waterfall', { name: username});
					}
				else {
					res.render('index');
				}
			}
			
		}  
	},verifyUserQuery); 
}

 exports.addCard = function (req,res)
 {
	    
		var title = req.param("title");
		var desc = req.param("desc");
		var priority = req.param("priority");
		var startdate = req.param("startdate");
		var finishdate = req.param("finishdate");
		
		console.log("title:"+title);
		console.log("desc:"+desc);
		console.log("priority:"+priority);
	
		var insertCardDetails1="INSERT INTO TENANTDATAEXTENSION(RECORD_ID,EXTENSION_ID,VALUE) VALUES ('3004','577','"+title+"')";
		var insertCardDetails2="INSERT INTO TENANTDATAEXTENSION(RECORD_ID,EXTENSION_ID,VALUE) VALUES ('3004','578','"+desc+"')";

		console.log("Query is:"+insertCardDetails1);
		//console.log("name is: "+req.session("username"));
		mysql.fetchData(function(err,results){
			if(err){
				throw err;
			}
			else 
			{
				var RTSQuery="SELECT Max(CASE WHEN TME.EXTENSION_ID = '553' THEN EXT.value END) NC_TITLE, Max(CASE WHEN TME.EXTENSION_ID = '554' THEN EXT.value END) NC_DESC, Max(CASE WHEN TME.EXTENSION_ID = '577' THEN EXT.value END) NC_TITLE1, Max(CASE WHEN TME.EXTENSION_ID = '578' THEN EXT.value END) NC_DESC1, Max(CASE WHEN TME.EXTENSION_ID = '555' THEN EXT.value END) RTS_TITLE, Max(CASE WHEN TME.EXTENSION_ID = '556' THEN EXT.value END) RTS_DESC,  Max(CASE WHEN TME.EXTENSION_ID = '559' THEN EXT.value END) RFR_TITLE,  Max(CASE WHEN TME.EXTENSION_ID = '560' THEN EXT.value END) RFR_DESC,  Max(CASE WHEN TME.EXTENSION_ID = '557' THEN EXT.value END) IP_TITLE, Max(CASE WHEN TME.EXTENSION_ID = '558' THEN EXT.value END) IP_DESC,  Max(CASE WHEN TME.EXTENSION_ID = '561' THEN EXT.value END) RF_TITLE,  Max(CASE WHEN TME.EXTENSION_ID = '562' THEN EXT.value END) RF_DESC,  Max(CASE WHEN TME.EXTENSION_ID = '565' THEN EXT.value END) RTS_TITLE1, Max(CASE WHEN TME.EXTENSION_ID = '566' THEN EXT.value END) RTS_DESC1,  Max(CASE WHEN TME.EXTENSION_ID = '569' THEN EXT.value END) RFR_TITLE1,  Max(CASE WHEN TME.EXTENSION_ID = '568' THEN EXT.value END) RFR_DESC1,  Max(CASE WHEN TME.EXTENSION_ID = '567' THEN EXT.value END) IP_TITLE1,  Max(CASE WHEN TME.EXTENSION_ID = '570' THEN EXT.value END) IP_DESC1,  Max(CASE WHEN TME.EXTENSION_ID = '571' THEN EXT.value END) RF_TITLE1,  Max(CASE WHEN TME.EXTENSION_ID = '572' THEN EXT.value END) RF_DESC1,  Max(CASE WHEN TME.EXTENSION_ID = '573' THEN EXT.value END) RTS_TITLE2, Max(CASE WHEN TME.EXTENSION_ID = '574' THEN EXT.value END) RTS_DESC2, Max(CASE WHEN TME.EXTENSION_ID = '575' THEN EXT.value END) IP_TITLE2,  Max(CASE WHEN TME.EXTENSION_ID = '576' THEN EXT.value END) IP_DESC2, Count(CASE WHEN TME.EXTENSION_ID IN ('555', '565', '573') THEN EXT.value END) Count_RTS_TITLE,  Count(CASE WHEN TME.EXTENSION_ID IN ('559', '567') THEN EXT.value END) Count_RFR_TITLE,  Count(CASE WHEN TME.EXTENSION_ID IN ('557', '569', '575') THEN EXT.value END) Count_IP_TITLE, Count(CASE WHEN TME.EXTENSION_ID IN ('561', '571') THEN EXT.value END) Count_RF_TITLE   FROM TENANTDATAEXTENSION EXT, TENANTMETADATAEXTENSION TME  WHERE TME.EXTENSION_ID = EXT.EXTENSION_ID";
				console.log("Query is:"+RTSQuery);
				mysql.fetchData(function(err, tables, results){
					console.log (tables);
					if ( !err ) { 
						res.render('kanbannew1', {
							"tablelist" : tables, name: req.param("username")						
						 });
						
					} else {
					   res.send("error occurred " + err.message);
					}	
				},RTSQuery);
			}  
		},insertCardDetails1, insertCardDetails2);
 }
 
exports.signin = function(req, res) {
	req.session.name=req.param("username");
	res.render('kanbannew', {"username" : username}); 
	}

exports.editCard = function (req,res)
{
		req.session.name=req.param("username");
		var title = req.param("title");
		var desc = req.param("desc");
		var priority = req.param("priority");
		
		console.log("title:"+title);
		console.log("desc:"+desc);
		console.log("priority:"+priority);
		
		
		var updateCardDetails="UPDATE TENANTDATAEXTENSION SET VALUE= '"+desc+"' WHERE EXTENSION_ID='570'"; 
		console.log("Query is:"+updateCardDetails);
		mysql.fetchData(function(err,results){
			if(err){
				throw err;
			}
			else 
			{
				var RTSQuery="SELECT Max(CASE WHEN TME.EXTENSION_ID = '553' THEN EXT.value END) NC_TITLE, Max(CASE WHEN TME.EXTENSION_ID = '554' THEN EXT.value END) NC_DESC, Max(CASE WHEN TME.EXTENSION_ID = '577' THEN EXT.value END) NC_TITLE1, Max(CASE WHEN TME.EXTENSION_ID = '578' THEN EXT.value END) NC_DESC1, Max(CASE WHEN TME.EXTENSION_ID = '555' THEN EXT.value END) RTS_TITLE, Max(CASE WHEN TME.EXTENSION_ID = '556' THEN EXT.value END) RTS_DESC,  Max(CASE WHEN TME.EXTENSION_ID = '559' THEN EXT.value END) RFR_TITLE,  Max(CASE WHEN TME.EXTENSION_ID = '560' THEN EXT.value END) RFR_DESC,  Max(CASE WHEN TME.EXTENSION_ID = '557' THEN EXT.value END) IP_TITLE, Max(CASE WHEN TME.EXTENSION_ID = '558' THEN EXT.value END) IP_DESC,  Max(CASE WHEN TME.EXTENSION_ID = '561' THEN EXT.value END) RF_TITLE,  Max(CASE WHEN TME.EXTENSION_ID = '562' THEN EXT.value END) RF_DESC,  Max(CASE WHEN TME.EXTENSION_ID = '565' THEN EXT.value END) RTS_TITLE1, Max(CASE WHEN TME.EXTENSION_ID = '566' THEN EXT.value END) RTS_DESC1,  Max(CASE WHEN TME.EXTENSION_ID = '569' THEN EXT.value END) RFR_TITLE1,  Max(CASE WHEN TME.EXTENSION_ID = '568' THEN EXT.value END) RFR_DESC1,  Max(CASE WHEN TME.EXTENSION_ID = '567' THEN EXT.value END) IP_TITLE1,  Max(CASE WHEN TME.EXTENSION_ID = '570' THEN EXT.value END) IP_DESC1,  Max(CASE WHEN TME.EXTENSION_ID = '571' THEN EXT.value END) RF_TITLE1,  Max(CASE WHEN TME.EXTENSION_ID = '572' THEN EXT.value END) RF_DESC1,  Max(CASE WHEN TME.EXTENSION_ID = '573' THEN EXT.value END) RTS_TITLE2, Max(CASE WHEN TME.EXTENSION_ID = '574' THEN EXT.value END) RTS_DESC2, Max(CASE WHEN TME.EXTENSION_ID = '575' THEN EXT.value END) IP_TITLE2,  Max(CASE WHEN TME.EXTENSION_ID = '576' THEN EXT.value END) IP_DESC2, Count(CASE WHEN TME.EXTENSION_ID IN ('555', '565', '573') THEN EXT.value END) Count_RTS_TITLE,  Count(CASE WHEN TME.EXTENSION_ID IN ('559', '567') THEN EXT.value END) Count_RFR_TITLE,  Count(CASE WHEN TME.EXTENSION_ID IN ('557', '569', '575') THEN EXT.value END) Count_IP_TITLE, Count(CASE WHEN TME.EXTENSION_ID IN ('561', '571') THEN EXT.value END) Count_RF_TITLE FROM TENANTDATAEXTENSION EXT, TENANTMETADATAEXTENSION TME  WHERE TME.EXTENSION_ID = EXT.EXTENSION_ID";
				console.log("Query is:"+RTSQuery);
				mysql.fetchData(function(err, tables, results){
					console.log (tables);
					if ( !err ) { 
						res.render('kanbannew1', {
							"tablelist" : tables						
						 });
						
					} else {
					   res.send("error occurred " + err.message);
					}	
				},RTSQuery);
			}  
		},updateCardDetails);
}
	

//exports.signin=verifySignin;

exports.insertUser=insertUser;




