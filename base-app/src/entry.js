import { exposeLib } from 'hel-lib-proxy';

/*
|--------------------------------------------------------------------------
|
| 对应 package.json/appGroupName
|
|--------------------------------------------------------------------------
*/
const LIB_NAME = 'micro-app';

const lib = exposeLib(LIB_NAME);

export { lib as default };
