routes.$inject = ['$stateProvider', '$controllerProvider'];

export default function routes($stateProvider, $controllerProvider) {
    $stateProvider.state('shell', {
        url: '/',
        views: {
        	header: {
        		template: require('./header.html'),
        		controller: 'ShellController',
        		controllerAs: 'shell'
        	},
        	content: {
        		template: require('../index/index.html'),
        		controller: 'IndexController as index',
        		resolve: {
        			load: [
        				'$q',
        				'$ocLazyLoad',
        				function ($q, $ocLazyLoad) {
                            return $q((resolve) => {
                                require.ensure([], () => {
                                    let module = require('../index/index.controller');
                                    $ocLazyLoad.load({name: 'index.controller'});
                                    resolve(module);
                                });
                            });
	        			}
        			]
        		}
        	},
        	footer: {
        		template: require('./footer.html')
        	}
        },
        controller: 'ShellController',
        controllerAs: 'shell'
    });
}