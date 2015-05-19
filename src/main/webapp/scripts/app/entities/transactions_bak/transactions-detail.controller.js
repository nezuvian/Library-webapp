'use strict';

angular.module('libappApp')
    .controller('TransactionsDetailController', function ($scope, $stateParams, Transactions, User, Book) {
        $scope.transactions = {};
        $scope.load = function (id) {
            Transactions.get({id: id}, function(result) {
              $scope.transactions = result;
            });
        };
        $scope.load($stateParams.id);
    });
