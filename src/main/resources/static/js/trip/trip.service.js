(function() {
	
	'use strict';
	
	var tripService = function($resource, CrudService) {
		var Trip = $resource("/trip");

        var filter = {'destination': '', 'start': '', 'end': ''};

        var trip = {
            'destination': '',
            'start': '',
            'end': '',
            'comment': '',
            'user': ''
        };

        var service = new CrudService(Trip, filter, trip);

        return service;
	};
	
	tripService.$inject = ['$resource', 'CrudService'];

    angular.module('travelplanner').factory('tripService', tripService);
	
})();