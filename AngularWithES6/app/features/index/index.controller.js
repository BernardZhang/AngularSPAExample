import './index.less';
import angular from 'angular';

class IndexController {
	constructor() {
		this.name = 'IndexController';
	}

	changeName() {
		this.name = 'Index:)';
	}
}

export default angular
	.module('index.controller', [])
	.controller('IndexController', IndexController);
