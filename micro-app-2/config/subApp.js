const helDevUtils = require('hel-dev-utils');
const pkg = require('../package.json');

const homePage = 'http://localhost';

const subApp = helDevUtils.createReactSubApp(pkg, {
    npmCdnType: 'unpkg',
    homePage: homePage,
    externals: {
        react: 'React',
        'react-is': 'ReactIs',
        'react-dom': 'ReactDOM',
        'react-dom/client': 'ReactDOM',
        moment: 'moment',
        antd: 'antd',
    }
});

module.exports = subApp;
