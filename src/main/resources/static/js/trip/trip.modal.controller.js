(function() {

    'use strict';

    var injectParams = ['$scope', '$uibModalInstance', 'tripService'];

    var controller = function($scope, $uibModalInstance, tripService) {

        $scope.getEntity = function() {
            return tripService.getEntity();
        };
        
        $scope.getOperation = function() {
            return tripService.getOperation();
        };

        $scope.ok = function () {

            var trip = tripService.getEntity();

            tripService.setEntity({              
              'destination': trip.destination,
              'start': trip.start,
              'end': trip.end,
              'comment': trip.comment              
            });
            
            var op = tripService.getOperation();
            
            if (op === 'Alter' || op === 'Delete') {
                tripService.getEntity().id = trip.id;
            }

            tripService.executeOperation();

            $uibModalInstance.close();

        };
        
        $scope.isDelete = function() {
            return tripService.isDelete();
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    };

    controller.$inject = injectParams;

    angular.module('travelplanner').controller('TripModalController', controller);

}());
