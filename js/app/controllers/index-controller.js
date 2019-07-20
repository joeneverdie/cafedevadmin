appAdmin.controller('IndexCtrl', ['$scope', '$uibModal', 'AuthService', '$rootScope', '$window',
   function ($scope, $uibModal, authService, $rootScope, $window) {

      $scope.openLoginModal = function () {
         var modalInstance = $uibModal.open({
            templateUrl: "views/modal/login.html",
            controller: "LoginCtrl",
         })
      }

      $scope.onLoad = function () {
         var token = authService.getValueByKey(TOKEN_KEY);
         if (token != null) {
            $rootScope.authenticated = true;
            $rootScope.username = authService.getValueByKey(USERNAME_KEY);
         } else {
            $scope.openLoginModal();
         }
      }
      $scope.onLoad();

      $scope.logout = function () {
         $rootScope.authenticated = false;
         $scope.isError = false;
         authService.removeByKey(TOKEN_KEY);
         authService.removeByKey(USERNAME_KEY);
         $window.location.reload();
      }

      $window.addEventListener('beforeunload', function () {

      });
   }]);
