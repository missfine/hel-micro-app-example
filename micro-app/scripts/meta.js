/*
|--------------------------------------------------------------------------
|
| 生成 hel-meta.json
|
|--------------------------------------------------------------------------
*/
const process = require('process');
const path = require('path');
const helDevUtils = require('hel-dev-utils');

const packageJson = require('../package.json');
const subApp = require('../config/subApp');

helDevUtils.extractHelMetaJson({
    subApp,
    buildDirFullPath: path.join(__dirname, '../hel_dist'),
    packageJson,
    enableRelativePath: true,
}).catch(err => {
    console.error(err);
    process.exit(-1);
});
