appAdmin.factory('AuthService', function($http){

	var getValueByKey = function(key){
		return localStorage.getItem(key);
	}
	
	var setKeyValue = function(key, value) {
		localStorage.setItem(key, value);
	};
	
	var removeByKey = function(key) {
		localStorage.removeItem(key);
	};

	var createAuthorizationTokenHeader = function() {
		var token = getValueByKey(TOKEN_KEY);
		if (token) {
			return {
				"Authorization" : "Bearer " + token,
				"Content-Type" : 'application/json',
				"cache-control": "no-cache"
			};
		} else {
			return {
				'Content-Type' : 'application/json'
			};
		}
	};

	return {
		getValueByKey : getValueByKey,
		setKeyValue : setKeyValue,
		removeByKey : removeByKey,
		createAuthorizationTokenHeader : createAuthorizationTokenHeader
	};
});