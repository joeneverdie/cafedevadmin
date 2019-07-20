var appAdmin = angular.module('appAdmin', [ 'ngRoute', 'ui.bootstrap' ]);

appAdmin.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/user', {
		templateUrl : 'views/user.html',
		controller : 'UserCtrl'
	}).when('/article', {
		templateUrl : 'views/article.html',
		controller : 'ArticleCtrl'
	}).when('/topic', {
		templateUrl : 'views/topic.html',
		controller : 'TopicCtrl'
	}).when('/comment', {
		templateUrl : 'views/comment.html',
		controller : 'CommentCtrl'
	}).otherwise({
		redirectTo : '/'
	});
}]);


