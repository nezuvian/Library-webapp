'use strict';

angular.module('libappApp')
    .controller('BookDetailController', function ($scope, $stateParams, Book, Author) {
        $scope.book = {};
        $scope.load = function (id) {
            Book.get({id: id}, function(result) {
              $scope.book = result;
            });
        };
        $scope.load($stateParams.id);
    });
