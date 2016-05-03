(function() {

    'use strict';

    var run = function($rootScope, $location) {
        var rootCtrl = {};

        rootCtrl.collapseNavBar = true;

        rootCtrl.toggleCollapseNavBar = function() {
            rootCtrl.collapseNavBar = !rootCtrl.collapseNavBar;
        };

        rootCtrl.isMenuActive = function(viewLocation) {
            return viewLocation === $location.path();
        };

        rootCtrl.isMenuHomeActive = function() {
            return rootCtrl.isMenuActive('/');
        };

        rootCtrl.isMenuTripActive = function() {
            return rootCtrl.isMenuActive('/trip');
        };

        rootCtrl.isMenuUserActive = function() {
            return rootCtrl.isMenuActive('/user');
        };
        
        rootCtrl.isMenuLoginActive = function() {
            return rootCtrl.isMenuActive('/login');
        };

        $rootScope.globals = { rootCtrl: rootCtrl };
    };

    run.$inject = ['$rootScope', '$location'];

    angular
        .module('travelplanner', ['chieffancypants.loadingBar', 'ngRoute', 'ngAnimate', 'ngResource', 'ui.bootstrap', 'toaster', 'ui.mask'])
        .config(function($routeProvider, $httpProvider) {
					
					$routeProvider.when('/', {
						templateUrl : 'home.html',
						controller : 'home',
						controllerAs : 'controller'
					}).when('/login', {
						templateUrl : 'js/login/login.html',
						controller : 'LoginController',
						controllerAs : 'controller'
					}).when('/createaccount', {
						templateUrl : 'js/user/user.create.html',
						controller : 'CreateUserController',
						controllerAs : 'controller'
					}).when('/trip', {
						templateUrl : 'js/trip/trip.list.html',
						controller : 'TripListController',
						controllerAs : 'controller'
					}).otherwise('/');

					$httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';

				}).controller('home', function($http) {
					var self = this;
					$http.get('resource/').then(function(response) {
						self.greeting = response.data;
					})
				}).filter('stringToDate', function () {
				    return function (input) {
				        if (!input)
				            return null;

				        var date = moment(input);
				        return date.isValid() ? date.toDate() : null;
				    };
				}).directive('jsonDate', function($filter) {
				      return  {
				          restrict: 'A',
				          require: 'ngModel',
				          link: function (scope, element, attrs, ngModel) {

				             //format text going to user (model to view)
				             ngModel.$formatters.push(function(value) {
				                var date = $filter('stringToDate')(value);
				                return date;
				             });

				             //format text from the user (view to model)
				             ngModel.$parsers.push(function(value) {
				                var date = new Date(value);
				                if (!isNaN( date.getTime())) { 
				                   return moment(date).format();
				                }
				             });
				         }
				      }}).run(run);
}());