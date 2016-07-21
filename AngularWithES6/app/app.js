// const angular = require('angualr');
import angualr from 'angular';
import uirouter from 'angular-ui-router';
import config from './app.config';
import shell from './features/shell';
import index from './features/index';
import list from './features/list';	

require('oclazyload');
console.log('lazyLoad', angular.module('lazyLoad', ['oc.lazyLoad']));
angular.module('app', [uirouter, 'oc.lazyLoad', shell, index, list])
	.config(config);
