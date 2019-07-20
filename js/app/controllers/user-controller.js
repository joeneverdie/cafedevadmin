appAdmin.controller('UserCtrl', ['$scope', '$uibModal', 'ApiProviderService', 'AuthService',
	function ($scope, $uibModal, apiProviderService, authService) {

		$scope.registerUser = {};
		var roles = [];

		$scope.openRegisterModal = function () {
			var modalInstance = $uibModal.open({
				templateUrl: 'views/modal/register.html',
				controller: "UserCtrl",
			})
		}

		$scope.openUpdateModal = function () {
			var modalInstance = $uibModal.open({
				templateUrl: 'views/modal/update.html',
				controller: "UserCtrl",
			})
		}

		$scope.getRole = function () {
			var promise = apiProviderService.getApi(URL_GET_ROLE);
			promise.then(function (response) {
				$scope.roles = response;
				console.log("roles ", $scope.roles);
			}, function (errorPayload) {
				console.log("errorPayload", errorPayload);
			})
		}

		$scope.register = function () {
			$scope.isError = false;
			if ($scope.registerUser.password != $scope.registerUser.comfirmPassword) {
				$scope.isError = true;
				$scope.errorMessage = "Password is not the same with the informed password";
			} else {
				roles.push($scope.roleName.authority);
				$scope.registerUser.roles = roles;
				if($scope.roleName.authority == 'ROLE_ADMIN'){
					roles.push('ROLE_USER');
					$scope.registerUser.roles = roles;
				}
				var promise = apiProviderService.postApi(URL_USER_REGISTER, $scope.registerUser);
				promise.then(function (response) {
					if (response.data == true) {
						$scope.$dismiss();
						location.reload();
					} else {
						$scope.isError = true;
						$scope.errorMessage = response.errorMessage;
					}
				})
					.catch(function (error) {
						alert("Server is busy now. Please try again later.");
					});
			}
		}

		$scope.update = function () {

		}

		$scope.cancel = function () {
			$scope.$dismiss();
		}

		$scope.getAllUser = function () {
			var promise = apiProviderService.getApi(URL_ALL_USER);
			promise.then(function (response) {
				$scope.users = response;
				console.log("users ", $scope.users);
			}, function (errorPayload) {
				console.log("errorPayload", errorPayload);
			})
		}

		$scope.onLoad = function () {
			var token = authService.getValueByKey(TOKEN_KEY);
			if (token != null) {
				$scope.getRole();
				$scope.getAllUser();
				$scope.update();
			}
		}
		$scope.onLoad();
	}]);
