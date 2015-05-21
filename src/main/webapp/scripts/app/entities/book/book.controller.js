'use strict';

angular.module('libappApp')
    .controller('BookController', function ($scope, $http, Book, Author, ParseLinks, Transaction, Principal) {
        $scope.books = [];
        $scope.authors = Author.query();
        $scope.page = 1;
        $scope.loadAll = function () {
            Book.query({page: $scope.page, per_page: 20}, function (result, headers) {
                $scope.links = ParseLinks.parse(headers('link'));
                $scope.books = result;
            });
        };
        $scope.loadPage = function (page) {
            $scope.page = page;
            $scope.loadAll();
        };
        $scope.loadAll();

        $scope.create = function () {
            Book.update($scope.book,
                function () {
                    $scope.loadAll();
                    $('#saveBookModal').modal('hide');
                    $scope.clear();
                });
        };

        $scope.update = function (id) {
            Book.get({id: id}, function (result) {
                $scope.book = result;
                $('#saveBookModal').modal('show');
            });
        };

        $scope.delete = function (id) {
            Book.get({id: id}, function (result) {
                $scope.book = result;
                $('#deleteBookConfirmation').modal('show');
            });
        };

        $scope.confirmDelete = function (id) {
            Book.delete({id: id},
                function () {
                    $scope.loadAll();
                    $('#deleteBookConfirmation').modal('hide');
                    $scope.clear();
                });
        };

        $scope.clear = function () {
            $scope.book = {title: null, publisher: null, date: null, language: null, id: null};
            $scope.editForm.$setPristine();
            $scope.editForm.$setUntouched();
        };

        $scope.borrow = function (id) {
            console.log('borrow called');

            var transaction = {};
            transaction.book = {};
            transaction.book.id = id;

            Transaction.update(transaction);
        }
    });
