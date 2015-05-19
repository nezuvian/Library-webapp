'use strict';

angular.module('libappApp')
    .factory('Book', function ($resource) {
        return $resource('api/books/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.date = new Date(data.date);
                    return data;
                }
            },
            'update': { method:'PUT' },
            'borrow': {
                method: 'POST',
                url: 'api/books/:id/borrow',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.date = new Date(data.date);
                    return data;
                }
            }
        });
    });
