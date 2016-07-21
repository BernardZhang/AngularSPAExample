import './list.less';
import angular from 'angular';
import uirouter from 'angular-ui-router';

class ListController {
	constructor() {
		this.name = 'ListController';
	}

	changeName() {
		this.name = 'List:)';
	}
}

export default angular
	.module('list.controller', [uirouter])
	.controller('ListController', ListController);



