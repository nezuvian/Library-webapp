'use strict';

angular.module('libappApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('transactions', {
                parent: 'entity',
                url: '/transactions',
                data: {
                    roles: ['ROLE_USER'],
                    pageTitle: 'libappApp.transactions.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/transactions/transactionss.html',
                        controller: 'TransactionsController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('transactions');
                        return $translate.refresh();
                    }]
                }
            })
            .state('transactionsDetail', {
                parent: 'entity',
                url: '/transactions/:id',
                data: {
                    roles: ['ROLE_USER'],
                    pageTitle: 'libappApp.transactions.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/transactions/transactions-detail.html',
                        controller: 'TransactionsDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('transactions');
                        return $translate.refresh();
                    }]
                }
            });
    });
