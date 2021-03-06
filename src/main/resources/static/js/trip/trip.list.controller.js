(function() {
	'use strict';

	angular.module('travelplanner').controller('TripListController',
			TripListController);

	TripListController.$inject = [ '$uibModal', 'tripService' ];

	function TripListController($uibModal, tripService) {

		var self = this;

		self.getEntities = function() {
			return tripService.getEntities();
		};

		self.getFilter = function() {
			return tripService.getFilter();
		};

		self.getPagination = function() {
			return tripService.getPagination();
		};

		self.pageChanged = function() {
			tripService.getEntitiesWithPagination();
		};

		self.search = function() {
			self.getPagination().currentPage = 1;
			tripService.getEntitiesWithPagination();
		};

		self.clearSearch = function() {
			tripService.clearSearch();
		};

		self.isSearchEmpty = function() {
			return tripService.isSearchEmpty();
		};

		self.totalRecords = function() {
			return self.getPagination().totalItems;
		};

		self.openModal = function(size) {

			tripService.initialize({
				'destination': '',
	            'start': '',
	            'end': '',
	            'comment': '',
	            'userId': ''
			});

			tripService.setOperation('Insert');
			
			openModal($uibModal);
		};
		
		self.openModalToAlter = function(entity) {
            tripService.setOperation('Alter');
            tripService.setEntity(entity);
            openModal($uibModal);
        };

        self.openModalToDelete = function(entity) {
        	tripService.setOperation('Delete');
            tripService.setEntity(entity);
            openModal($uibModal);
        };
        
        var openModal = function(uibModal) {
            uibModal.open({
              animation: true,
              templateUrl: '/js/trip/trip.modal.html',
              controller: 'TripModalController'
            });
          };

	}

})();