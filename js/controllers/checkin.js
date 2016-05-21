myApp.controller('checkinController', ['$scope','$rootScope','$firebaseObject','$routeParams','$firebaseArray','FIREBASE_URL','$location',
function($scope,$rootScope,$firebaseObject,$routeParams,$firebaseArray,FIREBASE_URL,$location) {
     $scope.whichmeeting = $routeParams.Mid;
     $scope.whichuser = $routeParams.Uid;
     var ref = new Firebase(FIREBASE_URL + 'users/' + $scope.whichuser + '/meetings/' + $scope.whichmeeting + '/checkins');
     
     var checkinList = $firebaseArray(ref);
     $scope.checkins = checkinList;
     
     $scope.order = "firstName";
     $scope.direction = null;
     $scope.query = "";
     $scope.recordId = '';
     $scope.addcheckin = function()
     {
     	
     	var checkinArray = $firebaseArray(ref);
     	
     	var data = {
     		'firstName' : $scope.user.firstname,
     		'lastName':$scope.user.lastname,
     		'email':$scope.user.email,
     		'date':Firebase.ServerValue.TIMESTAMP
     	}; //checkin data
     	
     	checkinArray.$add(data).then(function()
     	{
     		$location.path('/checkins/' + $scope.whichuser + '/' + $scope.whichmeeting + '/checkinList');
     	}); //add data to checkin
     	
     }; //add-checkin method
     $scope.deleteCheckin = function(id)
     {
     	var refDel = new Firebase(FIREBASE_URL + 'users/' + $scope.whichuser + '/meetings/' + $scope.whichmeeting + '/checkins/' + id);
     	var record = $firebaseObject(refDel);
     	record.$remove(id);
     	
     };//delete checkin user
     
     
     $scope.Pickrandom = function()
     {
     	var random = Math.floor((Math.random()*(checkinList.length -1))) ;
     	$scope.recordId = checkinList.$keyAt(random);
     	
     	
     }; //pick random
     
     $scope.showLove = function(mycheckin)
     {
     	mycheckin.show = !mycheckin.show;
     	if(mycheckin.userState == 'expanded')
     	{
     		mycheckin.userState = '';
     	}
     	else
     	{
     		mycheckin.userState = 'expanded';
     	}
     }; //showlove
     
     
     $scope.giveLove = function(mychekin,gift){
     	
     	var refaward = new Firebase(FIREBASE_URL + 'users/' + $scope.whichuser + '/meetings/' + $scope.whichmeeting + '/checkins/' + mychekin.$id + '/awards') ;
     	
     	var awardList = $firebaseArray(refaward);
     	
     	var myData = {
     		'name' : gift,
     		'date':Firebase.ServerValue.TIMESTAMP
     		
     	};
     	
     	awardList.$add(myData);
     	
     }; //givelove
     
     
     $scope.deleteAward = function(checkid,awardid)
     {
     	var delaward = new Firebase(FIREBASE_URL + 'users/' + $scope.whichuser + '/meetings/' + $scope.whichmeeting + '/checkins/' + checkid + '/awards') ;
     	var delObject = $firebaseObject(delaward);
     	
     	delObject.$remove(awardid);
     }; //delete award
     
}]);//controller