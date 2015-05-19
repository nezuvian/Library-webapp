'use strict';

angular.module('libappApp')
    .controller('TransactionsController', function ($scope, Transactions, User, Book, ParseLinks) {
        $scope.transactionss = [];
        $scope.users = User.query();
        $scope.books = Book.query();
        $scope.page = 1;
        $scope.loadAll = function() {
            Transactions.query({page: $scope.page, per_page: 20}, function(result, headers) {
                $scope.links = ParseLinks.parse(headers('link'));
                $scope.transactionss = result;
            });
        };
        $scope.loadPage = function(page) {
            $scope.page = page;
            $scope.loadAll();
        };
        $scope.loadAll();

        $scope.create = function () {
            Transactions.update($scope.transactions,
                function () {
                    $scope.loadAll();
                    $('#saveTransactionsModal').modal('hide');
                    $scope.clear();
                });
        };

        $scope.update = function (id) {
            Transactions.get({id: id}, function(result) {
                $scope.transactions = result;
                $('#saveTransactionsModal').modal('show');
            });
        };

        $scope.delete = function (id) {
            Transactions.get({id: id}, function(result) {
                $scope.transactions = result;
                $('#deleteTransactionsConfirmation').modal('show');
            });
        };

        $scope.confirmDelete = function (id) {
            Transactions.delete({id: id},
                function () {
                    $scope.loadAll();
                    $('#deleteTransactionsConfirmation').modal('hide');
                    $scope.clear();
                });
        };

        $scope.clear = function () {
            $scope.transactions = {id: null};
            $scope.editForm.$setPristine();
            $scope.editForm.$setUntouched();
        };
    });
