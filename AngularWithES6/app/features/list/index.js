import angular from 'angular';
import routing from './list.routes';

export default angular.module('app.list', [])
    .config(routing)
    .name;