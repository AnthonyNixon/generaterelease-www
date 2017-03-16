angular.module('releaseGeneratorApp', ['ngMaterial', 'ngRoute'])

    .config(['$mdThemingProvider', '$routeProvider', '$locationProvider', function ($mdThemingProvider, $routeProvider, $locationProvider) {
        //Set up theme for the site using Target Red
        $mdThemingProvider.theme('default')
            .primaryPalette('blue')
            .accentPalette('amber');

        $routeProvider
          .when('/', {
              templateUrl: template("home")
          })

        function template(page) {
            return 'src/views/' + page + '.html';
        }

        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
    }])

    // Set up routeCtrl to act as the controller for route operations
    .controller('rootCtrl', ['$scope', '$location', '$window', '$http', '$rootScope',
        function ($scope, $location, $window, $http, $rootScope) {
            $rootScope.goto = gotoInternal;
            $rootScope.gotoExternal = gotoExternal;
            $scope.releaseName = ""
            $scope.updateReleaseName = updateReleaseName;
            // function to go to an internal link
            // takes in a link variable
            // redirects the page to an internal link
            function gotoInternal(link) {
                console.log('goto ' + link);
                $location.path(link);
            }

            // function to go to an external link
            // takes in a link variable
            // redirects the page to the external link
            function gotoExternal(link) {
                $window.open(link);
            }

            function getReleaseName(letter) {
              $http.get("https://us-central1-releasegenerator.cloudfunctions.net/generaterelease?letter=" + letter)
                .then(function(response){ $scope.releaseName = response.data; });
            }

            function updateReleaseName() {
              console.log("current letter scope: " + $scope.letter);
              console.log("current letter scope: " + $rootScope.letter);
              $scope.releaseName = getReleaseName($scope.letter);
            }

        }])
