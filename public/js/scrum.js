var task;
var ScrumApp = angular.module('ScrumApp', ['ngMaterial']);

function ScrumController($scope, $http, $window) {
	$scope.showtask = function() {
		task = $scope.task;
  };
}

ScrumApp.controller('FirstCtrl', function($scope) {
    $scope.user = {project: ''};
  })
  .config( function($mdThemingProvider){
    // Configure a dark theme with primary foreground orange
    $mdThemingProvider.theme('docs-dark', 'default')
        .primaryPalette('yellow')
        .dark();
  });


//Controller for adding dynamic task table
ScrumApp.controller('AddBackCtrl', function($scope, $http) {
	
	  $scope.items = [ { n_proj:'', start_date: '', end_date: '', total_hours:'', n_res:'', sprint_no:''}];
	  $scope.objects = [ { u_story: '',name:'', sprintno:''}];




	  // expose a function to add new (blank) rows to the model/table
	  $scope.addRow = function() { 
		  
	 
		  $scope.items.push({}); 
		 // alert("1");
		  for(var i=0;i<$scope.items.length-1;i++)
			  {
			  //alert("in loop" + i);
			  console.log($scope.items[i].start_date);
			  var datestring = $scope.items[i].start_date;
              var startdate = new Date(datestring);
              console.log("start"+startdate);
              datestring = $scope.items[i].end_date;
              var enddate = new Date(datestring);
              console.log("end"+enddate);
              var oneDay = 24*60*60*1000;
              var xdiff = Math.round(Math.abs((enddate.getTime() - startdate.getTime())/(oneDay)));
              console.log("diff"+xdiff);
              var ydiff = (0-$scope.items[i].total_hours);
              var m=(ydiff/xdiff);
              
			  $http({
	              method: 'POST',
	              url: '/addback',
	              data: { "n_proj": $scope.items[i].n_proj, "end_date": $scope.items[i].end_date, "start_date": $scope.items[i].start_date, "total_hours": $scope.items[i].total_hours, "n_res": $scope.items[i].n_res, "sprint_no": $scope.items[i].sprint_no, "velocity": m}
	              
	           }).success(function(response){
	           
	          }).error(function(error){
	              alert("error");
	          });     
			  }
};  
	  


	  //delete rows
	  $scope.delRow = function() { 
		   
		  $scope.items.pop(); 			
		  };

	  $scope.save = function() {
	  
	    if ($scope.AddTaskForm.$valid) { console.log("it's valid"); }
	  };


$scope.addRow1 = function() { 
	
	  $scope.objects.push({}); 
	 // alert("1");
	  for(var i=0;i<$scope.objects.length-1;i++)
	  {
		  $http({
          method: 'POST',
          url: '/addstory1',
          data: { "u_story": $scope.objects[i].u_story, "name": $scope.objects[i].name, "sprintno": $scope.objects[i].sprintno }
          
       }).success(function(response){
        
          
      }).error(function(error){
          alert("error");
      });           
	  }
};  
  

  //delete rows
  $scope.delRow1 = function() { 
	   
	  $scope.objects.pop(); 			
	  };

  // save all the rows (alternatively make a function to save each row by itself)
  $scope.save1 = function() {
    // your $scope.items now contain the current working values for every field shown and can be parse, submitted over http, anything else you want to do with an array (like pass them to a service responsible for persistance)
    if ($scope.AddTaskForm.$valid) { console.log("it's valid"); }
  };
  
  $scope.sprint = function() {
		$http({
		  	url: '/sprints', 
		  	method: "GET",
		 	}).success(function(response){
			           
			            //alert(JSON.stringify(response));
			            window.location = '/sprints';
			          
			        }).error(function(error){
			            alert("error");
			        });
			};
  
  
});


ScrumApp.controller('ScrumController', ScrumController).config( function($mdThemingProvider){
    // Configure a dark theme with primary foreground yellow
    $mdThemingProvider.theme('default');
    
  });




