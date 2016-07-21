routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
    $stateProvider.state('shell.index', {
        url: 'index',
        views: {
        	'content@': {
        		template: require('./index.html'),
        		controller: 'IndexController as index',
        		resolve: {
        			load: [
        				'$q',
        				'$ocLazyLoad',
        				($q, $ocLazyLoad) => {
                            return $q((resolve) => {
                                require.ensure([], () => {
                                    // load whole module
                                    let module = require('./index.controller');
                                    $ocLazyLoad.load({name: 'index.controller'});
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