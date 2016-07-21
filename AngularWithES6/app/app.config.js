import angular from 'angular';

config.$inject = ['$urlRouterProvider', '$locationProvider'];

export default function config($urlRouterProvider, $locationProvider) {
	$locationProvider.html5Mode(false);
	$urlRouterProvider.otherwise('/index');
	// console.log('app controller', app.controller);
}