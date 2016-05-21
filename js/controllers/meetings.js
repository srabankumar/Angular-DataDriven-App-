myApp.controller('MeetingsController', ['$scope','$rootScope','$firebaseAuth','$firebaseArray','FIREBASE_URL',
function($scope,$rootScope,$firebaseAuth,$firebaseArray,FIREBASE_URL) {
     var ref = new Firebase(FIREBASE_URL);
     var auth = $firebaseAuth(ref);
     
     auth.$onAuth(function(authUser)
     {
     	if(authUser)
     		{
     			var meetinginfo = new Firebase(FIREBASE_URL+ 'users/' + $rootScope.currentUser.$id+ '/meetings');
     			var meetingsArray = $firebaseArray(meetinginfo);
     			$scope.meetings = meetingsArray;
     			
     			meetingsArray.$loaded().then(function(data){
     				$rootScope.numberofmeetings = meetingsArray.length;
     			}); //meetingArray is loaded
     			
     			meetingsArray.$watch(function(data)
     			{
     				$rootScope.numberofmeetings = meetingsArray.length;
     			});
     			
     			$scope.addmeetings = function()
     			{
     				meetingsArray.$add({
     					name:$scope.meetingName,
     					data: Firebase.ServerValue.TIMESTAMP    					
     					
     				}).then(function()
     				{
     					$scope.meetingName = "";
     				}); //promises
     			}; // add meetings
     			$scope.deleteMeeting = function(key)
     			{
     				meetingsArray.$remove(key);
     				
     			};//delete meeting
     			
     		}//user authentication
     	
     });//AuthFunction
}]);//controller