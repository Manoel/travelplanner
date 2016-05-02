(function() {

    'use strict';

    var injectParams = ['$scope', '$uibModalInstance', 'tripService'];

    var controller = function($scope, $uibModalInstance, tripService) {

        $scope.getEntity = function() {
            return tripService.getEntity();
        };

        $scope.ok = function () {

            var trip = tripService.getEntity();

            tripService.setEntity({
              'destination': trip.destination,
              'start': trip.start,
              'end': trip.end,
              'comment': trip.comment,
              'user': trip.user
            });

            tripService.executeOperation();

            $uibModalInstance.close();

        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    };

    controller.$inject = injectParams;

    angular.module('travelplanner').controller('TripModalController', controller);

}());
