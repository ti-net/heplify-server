(function(angular, homer) {
    "use strict";
    defineHomerAngularModule(homer.modules.app.name).controller("homerAppController", [ "$scope", "$rootScope", "eventbus", "$state", homer.modules.auth.services.authentication, "$location", "dialogs", homer.modules.core.services.profile, function($scope, $rootScope, eventbus, $state, authentication, $location, $dialogs, userProfile) {
        $rootScope.homerApp = "HOMER";
        $rootScope.homerVersion = "5.0.4 Release";
        console.log("HOMER INIT:", $rootScope.homerVersion);
        $scope.header = "templates/empty.html";
        $scope.menu = "templates/empty.html";
        $scope.ribbon = "templates/empty.html";
        $scope.footer = "templates/empty.html";
        $scope.shortcut = "templates/empty.html";
        $scope.templateSet = false;
        $rootScope.currentUser = {};
        $scope.addDashBoard = function() {
            var dlg = $dialogs.create("templates/dialogs/newdialog.html", "newDashboardCtrl", {}, {
                key: false,
                back: "static"
            });
            dlg.result.then(function(dashboardname) {
                if (dashboardname != "upload") {
                    $scope.dashboardname = dashboardname;
                    eventbus.broadcast(homer.modules.pages.events.newDashboardItem, dashboardname);
                } else {
                    eventbus.broadcast(homer.modules.pages.events.dashBoardChanged, dashboardname);
                }
            }, function() {
                $scope.name = "No name, defaulting to New";
            });
        };
        $scope.showLeftMenu = false;
        $scope.boolLeftMenu = false;
        $scope.boolDropDownAlert = false;
        $scope.boolDropDownUserMenu = false;
        $scope.boolDropDownSearch = false;
        $scope.changeClass = function() {
            $scope.boolLeftMenu = !$scope.boolLeftMenu;
            eventbus.broadcast("globalWidgetRecreate", 1);
        };
        $scope.triggerDoSearch = function() {
            $scope.boolLeftMenu = false;
        };
        $scope.expandLeftMenu = function() {
            $scope.boolLeftMenu = false;
        };
        function toggle(obj) {
            if (obj == "boolDropDownAlert") {
                $scope.boolDropDownAlert = !$scope.boolDropDownAlert;
            } else {
                $scope.boolDropDownAlert = false;
            }
            if (obj == "boolDropDownSearch") {
                $scope.boolDropDownSearch = !$scope.boolDropDownSearch;
            } else {
                $scope.boolDropDownSearch = false;
            }
            if (obj == "boolDropDownUserMenu") {
                $scope.boolDropDownUserMenu = !$scope.boolDropDownUserMenu;
            } else {
                $scope.boolDropDownUserMenu = false;
            }
            if (obj == "boolDropDownLastMenu") {
                $scope.boolDropDownLastMenu = !$scope.boolDropDownLastMenu;
            } else {
                $scope.boolDropDownLastMenu = false;
            }
            if (obj == "boolDropDownRefreshMenu") {
                $scope.boolDropDownRefreshMenu = !$scope.boolDropDownRefreshMenu;
            } else {
                $scope.boolDropDownRefreshMenu = false;
            }
        }
        $scope.showAlertBox = function() {
            toggle("boolDropDownAlert");
        };
        $scope.showSearchBox = function() {
            toggle("boolDropDownSearch");
        };
        $scope.showUserMenuBox = function() {
            toggle("boolDropDownUserMenu");
        };
        $scope.showLastMenuBox = function() {
            toggle("boolDropDownLastMenu");
        };
        $scope.showRefreshMenuBox = function() {
            toggle("boolDropDownRefreshMenu");
        };
        $scope.searchClass = "btn btn-primary";
        $scope.showMenu = function() {
            $scope.showLeftMenu = !$scope.showLeftMenu;
        };
        $scope.doLogout = function() {
            $scope.showLeftMenu = false;
            $scope.dropDownUserMenuClass = "";
            $location.path(homer.modules.auth.routes.logout);
        };
        $scope.doResetProfile = function() {
            $scope.showLeftMenu = false;
            $scope.dropDownUserMenuClass = "";
            userProfile.deleteAllProfile();
            $location.path(homer.modules.auth.routes.logout);
        };

        $scope.doUserProfile = function() {
            eventbus.broadcast(homer.modules.pages.events.showUserProfile, "1");
        };

        $scope.doSaveGridState = function() {
            eventbus.broadcast(homer.modules.pages.events.saveGridState, "1");
        };
        
        $scope.doRestoreGridState = function() {
            eventbus.broadcast(homer.modules.pages.events.restoreGridState, "1");
        };
        
        $scope.doResetGridState = function() {
            eventbus.broadcast(homer.modules.pages.events.resetGridState, "1");
            $location.path(homer.modules.pages.routes.home);
        };

        eventbus.subscribe(homer.modules.auth.events.userLoggedIn, function(event, args) {
            if (!$scope.templateSet) {
                
                $scope.showLeftMenu = true;
                $scope.header = "templates/header.html";
                $scope.menu = "templates/left-panel.html";
                $scope.ribbon = "templates/ribbon.html";
                $scope.footer = "templates/footer.html";
                $scope.shortcut = "templates/shortcut.html";
                $scope.templateSet = true;
                if ($state.current.name != "" && $state.current.name != "login") {
                    $state.go($state.current, {}, {
                        reload: true
                    });
                }
                
                $scope.boolLeftMenu = true;                            
            }
        });
        eventbus.subscribe(homer.modules.auth.events.userLoggedOut, function(event, args) {
            $scope.showLeftMenu = false;
            if ($scope.templateSet) {
                $scope.header = null;
                $scope.menu = null;
                $scope.ribbon = null;
                $scope.footer = null;
                $scope.shortcut = null;
                $scope.templateSet = false;
            }
        });
        eventbus.subscribe(homer.modules.pages.events.hideLeftMenu, function(event, args) {
            $scope.boolLeftMenu = true;
        });
    } ]).controller("HomerDatepickerCtrl", function($scope, $rootScope, $filter, dialogs, userProfile, eventbus, $interval, $state) {
        var dt = new Date(new Date().setHours(new Date().getHours() - 2));

        $scope.timerange = userProfile.profileScope.timerange;
        $scope.timezone = userProfile.profileScope.timezone;        
        
        var stop;
        (function() {
            $scope.$watch(function() {
                return userProfile.profileScope.timerange;
            }, function(newVal, oldVal) {
                if (newVal !== oldVal) {
                    //$scope.timerange.customFrom = newVal.from
                    //$scope.timerange.customTo = newVal.to;
                    $scope.timerange = newVal;
                    updateTimeRange(true);
                }
            });
        })();
        
        (function() {
            $scope.$watch(function() {
                return userProfile.profileScope.timezone;
            }, function(newVal, oldVal) {
                if (newVal !== oldVal) {
                    $scope.timezone = newVal;
                    for( var prop in $scope.timezones ) {
                        if( $scope.timezones[prop].value == $scope.timezone.value ) {
                                $scope.timezone.name = $scope.timezones[prop].name;
                                $scope.timezone.offset = $scope.timezones[prop].offset;
                        }
                    }
                    updateTimeRange(true);
                }
            });
        })();
        
        $scope.$watch('timezone.value', function(oldVal, newVal) {

                if(oldVal != newVal) {                                         
                    var diff = oldVal - newVal;
                    var ct = new Date($scope.timerange.customFrom);
                    ct.setMinutes(ct.getMinutes() - diff);                
                    $scope.timerange.customFrom = ct;
                    ct = new Date($scope.timerange.customTo);
                    ct.setMinutes(ct.getMinutes() - diff);                
                    $scope.timerange.customTo = ct;
                    $scope.timerange.to = $scope.timerange.customTo;
                    $scope.timerange.from = $scope.timerange.customFrom;
                    updateTimeRange(false);
                }                
                
                return true;
        });
        
        $scope.timezones = [
        {value: 60, offset: '-0100', name: 'GMT-1', desc: 'GMT-1'},
	 {value: 120, offset: '-0200', name: 'GMT-2', desc: 'GMT-2'},
	 {value: 180, offset: '-0300', name: 'GMT-3', desc: 'GMT-3'},
	 {value: 240, offset: '-0400', name: 'GMT-4 AST', desc: 'Atlantic Standard Time (Canada)'},
	 {value: 300, offset: '-0500', name: 'GMT-5 EST', desc: 'Eastern Standard Time (USA & Canada)'},
	 {value: 360, offset: '-0600', name: 'GMT-6 CST', desc: 'Central Standard Time (USA & Canada)'},
	 {value: 420, offset: '-0700', name: 'GMT-7 MST', desc: 'Mountain Standard Time (USA & Canada)'},
	 {value: 480, offset: '-0800', name: 'GMT-8 PST', desc: 'Pacific Standard Time (USA & Canada)'},
	 {value: 0, offset: '+0000', name: 'GMT+0 UTC', desc: 'Greenwich Mean Time'},
	 {value: -60, offset: '+0100', name: 'GMT+1 CET', desc: 'Central European Time'},
	 {value: -120, offset: '+0200', name: 'GMT+2 EET', desc: 'Eastern European Time'},
	 {value: -180, offset: '+0300', name: 'GMT+3 MSK', desc: 'Moscow Standard Time'},
	 {value: -240, offset: '+0400', name: 'GMT+4', desc: 'GMT +4'},
	 {value: -300, offset: '+0500', name: 'GMT+5', desc: 'GMT +5'},
	 {value: -360, offset: '+0600', name: 'GMT+6', desc: 'GMT +6'},
	 {value: -420, offset: '+0700', name: 'GMT+7', desc: 'GMT +7'},
	 {value: -480, offset: '+0800', name: 'GMT+8 CCT', desc: 'China Coast Time'},
	 {value: -520, offset: '+0900', name: 'GMT+9 JST', desc: 'Japan Standard Time'},
        {value: -600, offset: '+1000', name: 'GMT+10 AEST', desc: 'Australian Eastern Standard Time'},
        {value: -660, offset: '+1100', name: 'GMT+11 AEDT', desc: 'Australian Eastern Daylight Time'},
        {value: -720, offset: '+1200', name: 'GMT+12 NZST', desc: 'New Zealand Standard Time'},
        {value: -780, offset: '+1300', name: 'GMT+13 NZDT', desc: 'New Zealand Daylight Time'}
	];
                
        $scope.toggleMin = function() {
            $scope.minDate = $scope.minDate ? null : new Date().setFullYear(2013, 0, 1);
            $scope.maxDate = $scope.maxDate ? null : new Date().setFullYear(2032, 0, 1);
        };
        $scope.toggleMin();
        $scope.dateOptions = {
            formatYear: "yy",
            startingDay: 1,
            showWeeks: false
        };
        $scope.formats = [ "yyyy/MM/dd", "yyyy-MM-dd", "dd.MM.yyyy", "shortDate" ];
        $scope.formatDate = $scope.formats[1];        
        $scope.hstep = 1;
        $scope.mstep = 1;
        $scope.sstep = 1;
        $scope.setFromNow = function() {
            var dt = new Date(new Date().setMinutes(new Date().getMinutes() + 5));
            $scope.timerange = {
                from: new Date(),
                to: dt
            };
            userProfile.setProfile("timerange", $scope.timerange);
            eventbus.broadcast("globalWidgetReload", 1);
        };
        $scope.timeWindow = false;
        function updateTimeRange(refreshCustom) {
            if ($scope.timerange.custom) {
                $scope.filterIndicator = $scope.timerange.custom;
            } else {
                var timeDiff;
                timeDiff = $scope.timerange.to - $scope.timerange.from;
                var namezone = "";
                       
		for( var prop in $scope.timezones ) {
			if( $scope.timezones[prop].value == $scope.timezone.value ) {
				$scope.timezone.name = $scope.timezones[prop].name;
				$scope.timezone.offset = $scope.timezones[prop].offset;
		        }
		}

                $scope.filterIndicator = "From " + $filter("date")($scope.timerange.from, "yyyy-MM-dd HH:mm:ss") + " to " + $filter("date")($scope.timerange.to, "yyyy-MM-dd HH:mm:ss") + ", TZ "+ $scope.timezone.name;
                
            }
            if (refreshCustom) {
                $scope.timerange.customFrom = $scope.timerange.from;
                $scope.timerange.customTo = $scope.timerange.to;
            }
        }
        $scope.updateFrequency = "";
        updateTimeRange(true);
        $rootScope.setRange = function(type, tss) {
            //console.log("SELECT RANGE:", tss);
            if ($scope.timerange.to != tss.to || $scope.timerange.from != tss.from) {
                $scope.timerange.to = tss.to;
                $scope.timerange.from = tss.from;
                $scope.timerange.custom = "";
                userProfile.setProfile("timerange", $scope.timerange);
                eventbus.broadcast("globalWidgetReload", 1);
                updateTimeRange(true);
            }
        };
        $scope.toggleTimeWindow = function() {
            $scope.timeWindow = !$scope.timeWindow;
        };
        $scope.isActive = function(item) {
            if ($scope.timerange.custom == item) {
                return true;
            }
            return false;
        };
                
        $scope.isUpdatingActive = function(item) {
            if ($scope.updateFrequency == item) {
                return true;
            }
            return false;
        };
        $scope.selectCustomeTime = function() {
            $scope.timerange.custom = "";
            $scope.timerange.to = new Date($scope.timerange.customTo);
            $scope.timerange.from = new Date($scope.timerange.customFrom);
            userProfile.setProfile("timerange", $scope.timerange);
            userProfile.setProfile("timezone", $scope.timezone);
            eventbus.broadcast("globalWidgetReload", 1);
            $scope.timeWindow = false;
            updateTimeRange(false);
        };
        $scope.last = function(min, text) {
            var diff = (new Date().getTimezoneOffset() - $scope.timezone.value);                                     
            var dt = new Date(new Date().setMinutes(new Date().getMinutes() - min + diff));
            $scope.timerange = {
                from: dt,
                to: new Date(new Date().setMinutes(new Date().getMinutes() + diff)),
                custom: text
            };
            userProfile.setProfile("timerange", $scope.timerange);
            userProfile.setProfile("timezone", $scope.timezone);
            eventbus.broadcast("globalWidgetReload", 1);
            $scope.timeWindow = false;
            updateTimeRange(true);
        };        
        
        $scope.dayselect = function(day, text) {
        
            var min = day * 1440;
            var diff = (new Date().getTimezoneOffset() - $scope.timezone.value);                                     
            var bdt = new Date(new Date().setMinutes(new Date().getMinutes() + min + diff));
            var sdt = new Date(new Date().setMinutes(new Date().getMinutes() + min + diff));
            bdt.setHours(0,0,0,0);
            sdt.setHours(23,59,59,99);
                        
            $scope.timerange = {
                from: bdt,
                to: sdt,
                custom: text
            };
            userProfile.setProfile("timerange", $scope.timerange);
            userProfile.setProfile("timezone", $scope.timezone);
            eventbus.broadcast("globalWidgetReload", 1);
            $scope.timeWindow = false;
            updateTimeRange(true);
        };        
        
        $scope.next = function(min, text) {
            var diff = (new Date().getTimezoneOffset() - $scope.timezone.value);                                     
            var dt = new Date(new Date().setMinutes(new Date().getMinutes() + min + diff));
            $scope.timerange = {
                from: new Date(new Date().setMinutes(new Date().getMinutes() + diff)),
                to: dt,
                custom: text
            };
            userProfile.setProfile("timerange", $scope.timerange);
            userProfile.setProfile("timezone", $scope.timezone);
            eventbus.broadcast("globalWidgetReload", 1);
            $scope.timeWindow = false;
            updateTimeRange(true);
        };
        $scope.open = function($event, opened) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope[opened] = true;
        };
        $scope.setToNow = function(type) {
             var diff = (new Date().getTimezoneOffset() - $scope.timezone.value);
            if (type == 1) {
                $scope.timerange.customFrom = new Date().setMinutes(new Date().getMinutes() + diff);
            } else {
                $scope.timerange.customTo = new Date().setMinutes(new Date().getMinutes() + diff);
            }
        };
        $scope.refresh = function(seconds, name) {
            console.log("REFRESH:" + seconds);
            seconds = parseInt(seconds);
            if (seconds < 1) {
                eventbus.broadcast("globalWidgetReload", 1);
                return;
            }
            if (angular.isDefined(stop)) {
                $scope.cancelRefresh();
            }
            $scope.timeWindow = false;
            $scope.activeInterval = true;
            if ($state.current.name == "result") {
                stop = $interval(function() {
                    $scope.timerange.to.setSeconds($scope.timerange.to.getSeconds() + seconds);
		    $scope.timerange.from.setSeconds($scope.timerange.from.getSeconds() + seconds);
                    userProfile.setProfile("timerange", $scope.timerange);
                    userProfile.setProfile("timezone", $scope.timezone);
                    eventbus.broadcast(homer.modules.pages.events.resultSearchSubmit, "fullsearch");
                }, seconds * 1e3);
            } else {
                stop = $interval(function() {
                    updateTimeRange(false);
                    $scope.timerange.from.setSeconds($scope.timerange.from.getSeconds() + seconds);
                    $scope.timerange.to.setSeconds($scope.timerange.to.getSeconds() + seconds);
                    userProfile.setProfile("timerange", $scope.timerange);
                    userProfile.setProfile("timezone", $scope.timezone);
                    eventbus.broadcast("globalWidgetReload", 1);
                }, seconds * 1e3);
            }
            $scope.updateFrequency = name;
        };
        $scope.cancelRefresh = function() {
            if (angular.isDefined(stop)) {
                $interval.cancel(stop);
                stop = undefined;
                $scope.activeInterval = false;
            }
            $scope.timeWindow = false;
            $scope.updateFrequency = "";
        };
        eventbus.subscribe(homer.modules.pages.events.destroyRefresh, function(event, name, model) {
            $scope.cancelRefresh();
        });
        eventbus.subscribe(homer.modules.pages.events.setTimeRange, function(event, timeRange, model) {
            $scope.timerange = timeRange;
            console.log("SET RANGE", $scope.timerange);
            userProfile.setProfile("timerange", $scope.timerange);            
            updateTimeRange(true);                        
        });
    }).controller("timerangeDialogCtrl", function($log, $scope, $uibModalInstance, data) {
        $scope.timerange = data;
        $scope.options = {
            hstep: [ 1, 2, 3 ],
            mstep: [ 1, 5, 10, 15, 25, 30 ],
            sstep: [ 1, 5, 10, 15, 25, 30 ]
        };
        $scope.$watch("timerange.from", function(val, old) {
            $log.info("Date Changed: " + val);
            $scope.opened = false;
        });
        $scope.setDate = function() {
            if (!angular.isDefined($scope.timerange.from)) $scope.timerange.from = new Date();
            if (!angular.isDefined($scope.timerange.to)) $scope.timerange.to = new Date();
        };
        $scope.setDate();
        $scope.done = function() {
            $uibModalInstance.close($scope.timerange);
        };
    }).config(function(dialogsProvider) {
        dialogsProvider.useBackdrop(true);
        dialogsProvider.useEscClose(true);
        dialogsProvider.useCopy(false);
        dialogsProvider.setSize("sm");
    }).controller("newDashboardCtrl", function($scope, $uibModalInstance, data, FileUploader) {
        $scope.dashboard = {
            name: ""
        };
        $scope.cancel = function() {
            $uibModalInstance.dismiss("canceled");
        };
        $scope.hitEnter = function(evt) {
            if (angular.equals(evt.keyCode, 13) && !(angular.equals($scope.dashboard, null) || angular.equals($scope.dashboard, ""))) $scope.save();
        };
        var uploader = $scope.uploader = new FileUploader({
            url: "api/v1/dashboard/upload"
        });
        $scope.save = function() {
            if ($scope.uploader.queue.length > 0) {
                uploader.uploadAll();
            } else {
                if ($scope.nameDialog.$valid) $uibModalInstance.close($scope.dashboard.name);
            }
        };
        uploader.filters.push({
            name: "customFilter",
            fn: function(item, options) {
                return this.queue.length < 1;
            }
        });
        uploader.onCompleteAll = function() {
            console.info("onCompleteAll");
            $uibModalInstance.close("upload");
        };
    });
})(angular, homer);
