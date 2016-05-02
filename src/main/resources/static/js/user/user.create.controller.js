(function(){
	
	'use strict';
	
	angular.module('travelplanner').controller('CreateUserController', CreateUserController);
	
	CreateUserController.$inject = ['$rootScope', '$http', '$location'];
	
	function CreateUserController($rootScope, $http, $location) {

		  var self = this;

		  var doCreateAccount = function(credentials, callback) {

		    var postData = {email: credentials.username, password: btoa(credentials.password)};

		    $http.post('user', postData).then(function(response) {
		      if (response.data.name) {
		        $rootScope.authenticated = true;
		      } else {
		        $rootScope.authenticated = false;
		      }
		      callback && callback();
		    }, function() {
		      $rootScope.authenticated = false;
		      callback && callback();
		    });

		  };

		  self.credentials = {};
		  
		  self.createAccount = function() {
		      doCreateAccount(self.credentials, function() {
		        if ($rootScope.authenticated) {
		          $location.path("/");
		          self.error = false;
		        } else {
		          $location.path("/createaccount");
		          self.error = true;
		        }
		      });
		  };
		  
		};
	
})();