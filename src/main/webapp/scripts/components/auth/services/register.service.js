'use strict';

angular.module('libappApp')
    .factory('Register', function ($resource) {
        return $resource('api/register', {}, {
        });
    });


