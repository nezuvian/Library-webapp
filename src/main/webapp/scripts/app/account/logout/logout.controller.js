'use strict';

angular.module('libappApp')
    .controller('LogoutController', function (Auth) {
        Auth.logout();
    });
