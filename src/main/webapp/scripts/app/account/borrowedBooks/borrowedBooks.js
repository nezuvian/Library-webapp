/**
 * Created by nezuvian on 2015.05.21..
 */
'use strict';

angular.module('libappApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('borrowed-books', {
                parent: 'site',
                url: '/borrowed-books',
                data: {
                    roles: ['ROLE_USER'],
                    pageTitle: 'Borrowed Books'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/account/borrowedBooks/borrowedBooks.html',
                        controller: 'BorrowedBooksController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('author');
                        return $translate.refresh();
                    }]
                }
            });
    });
