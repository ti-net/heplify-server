/*
 * HOMER 5 UI (Xenophon)
 *
 * Copyright (C) 2011-2015 Alexandr Dubovikov <alexandr.dubovikov@gmail.com>
 * Copyright (C) 2011-2015 Lorenzo Mangani <lorenzo.mangani@gmail.com> QXIP B.V.
 * License AGPL-3.0 http://opensource.org/licenses/AGPL-3.0
 *
*/

(function (angular, homer) {
    'use strict';

     homer.modules.core = {
        name: 'homer-core',
        services: {
            profile: 'userProfile'
        }
    };

    angular.module(homer.modules.core.name, []);

    angular.module(homer.modules.core.name).factory(homer.modules.core.services.profile, [
        '$q',
	'$http',
        '$log',
        function ($q, $http, $log) {
                                
               var profileScope = {
		    timezone: {
		         value: new Date().getTimezoneOffset(),
		         name: "Default"
                    },
                    limit: 200
               };
               
               var getProfile = function(key)
               {                
                    return profileScope[key];
               };
                
               return {
                   getProfile: getProfile,
                   profileScope: profileScope
               };
          }
    ]);
}(angular, homer));
