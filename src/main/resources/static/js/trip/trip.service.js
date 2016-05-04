(function() {
	
	'use strict';
	
	var tripService = function($resource, CrudService) {
		var Trip = $resource("/trip/:tripId", {tripId:'@id'}, {
		      'update': {
		        method: 'PUT'
		      }
		});

        var filter = {'destination': '', 'start': '', 'end': ''};

        var trip = {
            'destination': '',
            'start': '',
            'end': '',
            'comment': '',
            'userId': ''
        };

        var service = new CrudService(Trip, filter, trip);

        return service;
	};
	
	tripService.$inject = ['$resource', 'CrudService'];

    angular.module('travelplanner').factory('tripService', tripService);
	
})();