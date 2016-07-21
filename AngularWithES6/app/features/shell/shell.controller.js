import './shell.less';

export default class ShellController {
	constructor() {
		this.name = 'ShellController';
		console.log('ShellController', arguments);
		this.headerItems = [
			{
				id: 'index',
				name: 'Index'
			},
			{
				id: 'list',
				name: 'List'
			}
		];
	}

	changeName() {
		this.name = 'shell:)';
	}
}