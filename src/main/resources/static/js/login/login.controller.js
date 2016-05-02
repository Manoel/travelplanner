(function () {
    'use strict';

    angular.module('travelplanner').controller('LoginController', LoginController);

    LoginController.$inject = ['$rootScope', '$http', '$location'];
    
    function LoginController($rootScope, $http, $location) {

		  var self = this;

		  var authenticate = function(credentials, callback) {

		    var headers = credentials ? {authorization : "Basic "
		        + btoa(credentials.username + ":" + credentials.password)
		    } : {};
		    
		    var parameters = {
		    	email: credentials ? credentials.username : "",
		    	password: credentials ? credentials.password : ""		
		    };
		    
		    var config = {
		    	params: parameters,
		    	headers : headers
	        };

		    $http.get('/user', config).then(function(response) {
		      if (response.data.email) {
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

		  authenticate();
		  
		  self.credentials = {};
		  
		  self.login = function() {
		      authenticate(self.credentials, function() {
		        if ($rootScope.authenticated) {
		          $location.path("/");
		          self.error = false;
		        } else {
		          $location.path("/login");
		          self.error = true;
		        }
		      });
		  };
		  
		  self.logout = function() {
			  $http.post('logout', {}).finally(function() {
			    $rootScope.authenticated = false;
			    $location.path("/");
			  });
			};
		};
    
})();