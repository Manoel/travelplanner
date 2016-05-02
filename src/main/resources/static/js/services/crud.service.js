(function() {

  'use strict';

  var service = function($filter) {
    var CrudService = function  (resource, filter, entity) {
      this.resource = resource;
      this.operation = '';
      this.entity = entity;
      this.entities = [];
      this.filter = filter;
      this.pagination = {'totalItems': 0, 'currentPage': 1, 'itemsPerPage': 10};
    };

    CrudService.prototype = {
      initialize: function(e) {
        this.operation = '';
        this.entity = e;
      },

      getOperation: function() {
        return this.operation;
      },

      isDelete: function() {
        return this.operation === 'Delete';
      },

      setOperation: function(o) {
        o = o ? o.trim() : '';

        if (o !== 'Insert' && o !== 'Alter' && o !== 'Delete') {
          throw new Error('The operation was not defined correctly, it should be Insert, Alter or Delete.');
        }

        this.operation = o;
      },

      getEntity: function() {
        return this.entity;
      },

      setEntity: function(e) {
        this.entity = e;
      },

      getEntitys: function() {
        return this.entitys;
      },

      clearFilter: function() {
        for (var prop in this.filter) {
          if (this.filter.hasOwnProperty(prop)) {
            this.filter[prop] = '';
          }
        }
      },

      clearSearch: function() {
        this.clearFilter();
        this.getPagination().currentPage = 1;
        this.getEntitiesWithPagination();
      },

      getFilter: function() {
        return this.filter;
      },

      getPagination: function() {
        return this.pagination;
      },

      obterEntitys: function(filter, not, otherFilter) {
        return this.resource.get(
          this.getQueryParameters(1, 999999999, filter))
          .$promise.then(function(result) {
              if (not) {
                  result.result = $filter('filter')(result.result, {id:'!' + not});
              }

              if (otherFilter) {
                result.result = $filter('filter')(result.result, otherFilter);
              }
              return result.result;
          });
      },

      getQueryParameters: function(currentPage, itemsPerPage, filter) {
        var parameters = {
          'currentPage': currentPage,
          'itemsPerPage': itemsPerPage
        };

        filter = filter || this.filter;

        for (var prop in filter) {
          if (filter.hasOwnProperty(prop)) {
            parameters[prop] = filter[prop];
          }
        }

        return parameters;
      },

      getEntitiesWithPagination:  function() {
        var service = this;
        return this.resource.get(
          this.getQueryParameters(this.getPagination().currentPage, this.getPagination().itemsPerPage))
          .$promise.then(function(result) {
            service.entities = result.result;
            service.pagination.totalItems = result.totalItems;
          });
      },

      insert: function() {
        var service = this;
        var newResource = new this.resource(this.entity);
        newResource.$save(function() {
          service.getEntitiesWithPagination();
        });
      },

      alter: function() {
        var service = this;
        this.resource.update(this.entity, function() {
          service.getEntitiesWithPagination();
        });
      },

      delete: function() {
        var service = this;
        var newResource = new this.resource(this.entity);
        newResource.$remove(function() {
          service.getEntitiesWithPagination();
        });
      },

      executeOperation: function() {
        if (this.getOperation() === 'Insert') {
          this.insert();
        } else if (this.getOperation() === 'Alter') {
          this.alter();
        } else if (this.getOperation() === 'Delete') {
          this.delete();
        } else {
          throw new Error('The operation was not defined correctly, it should be Insert, Alter or Delete. It should be defined through setOperation method.');
        }
      }

    };

    return CrudService;
  };

  service.$inject = ['$filter'];

  angular.module('travelplanner').factory('CrudService', service);

})();