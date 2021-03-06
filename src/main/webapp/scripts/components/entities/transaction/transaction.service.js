'use strict';

angular.module('libappApp')
    .factory('Transaction', function ($resource) {
        return $resource('api/transactions/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
            'update': { method:'PUT' },
            'forCurrentUser': {
                method: 'GET',
                isArray: true,
                url: 'api/transactions/forCurrentUser'
            }
        });
    });
