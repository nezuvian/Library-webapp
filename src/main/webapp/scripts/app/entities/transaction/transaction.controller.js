'use strict';

angular.module('libappApp')
    .controller('TransactionController', function ($scope, Transaction, User, Book, ParseLinks) {
        $scope.transactions = [];
        $scope.users = User.query();
        $scope.transactions = Book.query();
        $scope.page = 1;
        $scope.loadAll = function() {
            Transaction.query({page: $scope.page, per_page: 20}, function(result, headers) {
                $scope.links = ParseLinks.parse(headers('link'));
                $scope.transactions = result;
            });
        };
        $scope.loadPage = function(page) {
            $scope.page = page;
            $scope.loadAll();
        };
        $scope.loadAll();

        $scope.create = function () {
            Transaction.update($scope.transaction,
                function () {
                    $scope.loadAll();
                    $('#saveTransactionModal').modal('hide');
                    $scope.clear();
                });
        };

        $scope.update = function (id) {
            Transaction.get({id: id}, function(result) {
                $scope.transaction = result;
                $('#saveTransactionModal').modal('show');
            });
        };

        $scope.delete = function (id) {
            Transaction.get({id: id}, function(result) {
                $scope.transaction = result;
                $('#deleteTransactionConfirmation').modal('show');
            });
        };

        $scope.confirmDelete = function (id) {
            Transaction.delete({id: id},
                function () {
                    $scope.loadAll();
                    $('#deleteTransactionConfirmation').modal('hide');
                    $scope.clear();
                });
        };

        $scope.clear = function () {
            $scope.transaction = {id: null};
            $scope.editForm.$setPristine();
            $scope.editForm.$setUntouched();
        };
    });
