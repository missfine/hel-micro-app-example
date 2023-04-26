import { exposeLib } from 'hel-lib-proxy';

import * as libProperties from './libProperties';
import { LIB_NAME } from '../configs/subApp';

type LibProperties = typeof libProperties;

const lib = exposeLib<LibProperties>(LIB_NAME);

export type Lib = LibProperties;

export default lib;
