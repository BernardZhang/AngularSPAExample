routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
    $stateProvider.state('shell.list', {
        url: 'list',
        // template: require('./list.html'),
        // controller: 'ListController',
        // controllerAs: 'list',
        views: {
        	'content@': {
        		template: require('./list.html'),
        		controller: 'ListController',
        		controllerAs: 'list',
		  		resolve: {
        			controller: [
        				'$q',
                        '$ocLazyLoad',
        				function ($q, $ocLazyLoad) {
                            return $q((resolve) => {
                                require.ensure([], () => {
                                    let module = require('./list.controller');
                                    $ocLazyLoad.load({name: 'list.controller'});
                                    resolve(module);
                                });
                            });
	        			}
        			]
        		}
        	}
        }
    });
}
