/**
 * Created by nezuvian on 2015.05.21..
 */
'use strict';

angular.module('libappApp')
    .controller('BorrowedBooksController', function ($scope, Transaction) {
        $scope.transactions = [];
        $scope.page = 1;
        $scope.loadAll = function () {
            Transaction.forCurrentUser(function (result) {
                $scope.transactions = result;
            });
        };
        $scope.loadPage = function (page) {
            $scope.page = page;
            $scope.loadAll();
        };
        $scope.loadAll();

        $scope.return = function (id) {
            Transaction.delete({id:id});
            angular.forEach($scope.transactions, function(value, key) {
                if (value.id == id ) {
                    $scope.transactions.splice(key, 1);
                }
            });
        }
    });
