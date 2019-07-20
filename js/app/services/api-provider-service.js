appAdmin.service('ApiProviderService', ['$http', '$q', 'AuthService', function ($http, $q, authService) {

    this.getApi = function (urlEndpoint) {
        var deffered = $q.defer();
        $http({
            url: urlEndpoint,
            method: 'GET',
            headers: authService.createAuthorizationTokenHeader()
        })
        .success(function (response) {
            deffered.resolve(response);
        }).error(function (response) {
            deffered.reject(response);
        });
        return deffered.promise;
    }

    this.postApi = function (urlEndpoint, data) {
        var deffered = $q.defer();
        $http({
            url: urlEndpoint,
            method: 'POST',
            withCredentials: true,
            cache: true,
            data: data,
            headers: authService.createAuthorizationTokenHeader()
        })
            .success(function (response) {
                deffered.resolve(response);
            }).error(function (response) {
                deffered.reject(response);
            });
        return deffered.promise;
    }

    this.postMutipartFileApi = function (urlEndpoint, data) {
        var token = authService.getValueByKey(TOKEN_KEY);
        var deffered = $q.defer();
        $http({
            url: urlEndpoint,
            method: 'POST',
            data: data,
            transformRequest: angular.identity,
            headers: {
                'Content-Type': undefined,
                'Authorization': "Bearer " + token
            }
        })
            .success(function (response) {
                deffered.resolve(response);
            }).error(function (response) {
                deffered.reject(response);
            });
        return deffered.promise;
    }
}])