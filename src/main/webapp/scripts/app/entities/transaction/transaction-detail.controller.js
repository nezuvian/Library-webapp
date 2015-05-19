'use strict';

angular.module('libappApp')
    .controller('TransactionDetailController', function ($scope, $stateParams, Transaction, User, Book) {
        $scope.transaction = {};
        $scope.load = function (id) {
            Transaction.get({id: id}, function(result) {
              $scope.transaction = result;
            });
        };
        $scope.load($stateParams.id);
    });
