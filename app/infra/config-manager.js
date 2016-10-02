import PATH from 'path';
import HBS from 'express-handlebars';
import nconf from 'nconf';

import baseManager from './base-manager';

const ROOT = '../';
const defaultConfig = PATH.resolve(__dirname, ROOT, 'config/default.json');

nconf.argv().env().file({file: defaultConfig}).defaults({ENV: 'development'});

const configManager = Object.assign({}, baseManager, {
    configureDevelopmentEnv(app) {
        app.set('x-powered-by', false);
    }
});

export default configManager;
