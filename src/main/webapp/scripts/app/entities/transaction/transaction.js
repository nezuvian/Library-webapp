'use strict';

angular.module('libappApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('transaction', {
                parent: 'entity',
                url: '/transaction',
                data: {
                    roles: ['ROLE_USER'],
                    pageTitle: 'libappApp.transaction.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/transaction/transactions.html',
                        controller: 'TransactionController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('transaction');
                        return $translate.refresh();
                    }]
                }
            })
            .state('transactionDetail', {
                parent: 'entity',
                url: '/transaction/:id',
                data: {
                    roles: ['ROLE_USER'],
                    pageTitle: 'libappApp.transaction.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/transaction/transaction-detail.html',
                        controller: 'TransactionDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('transaction');
                        return $translate.refresh();
                    }]
                }
            });
    });
