appAdmin.controller('LoginCtrl', ['$scope', '$rootScope', 'AuthService', 'ApiProviderService', '$http',
	function ($scope, $rootScope, authService, apiProviderService) {

		$scope.credentials = {};

		$scope.login = function () {
			login($scope.credentials);
		}

		function login(credentials) {
			var promise = apiProviderService.postApi(URL_USER_LOGIN, credentials);
			promise.then(function (response) {
				if (response.data != null) {
					console.log(response.data);
					$rootScope.authenticated = true;
					$scope.isError = false;
					authService.setKeyValue(TOKEN_KEY, response.data.access_token);
					return apiProviderService.getApi(URL_WHO_AM_I);
				} else {
					$scope.errorMessage = response.errorMessage;
					$scope.isError = true;
				}
			})
				.then((user) => {
					if (!$scope.isError) {
						console.log("data from whoamiL ", user);
						if (user.firstName == null || user.lastName == null) {
							$rootScope.username = "How are you";
						} else {
							authService.setKeyValue(USERNAME_KEY, user.firstName + " " + user.lastName);
							$rootScope.username = authService.getValueByKey(USERNAME_KEY);
							location.reload();
						}
						$scope.$dismiss();
					}
				}).catch(function (error) {
					console.log("error when login:", error);
				});
		}
	}]);