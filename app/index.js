import angular from 'angular';
import uiRouter from 'angular-ui-router';

import './main.scss';

var oclazyload = require('oclazyload');

const app = angular.module('app', [uiRouter, 'oc.lazyLoad']);

require('./directives')(app);

require('./auth')(app);

require('./router')(app, angular);
