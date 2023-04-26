/* global module process */
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import { cst } from 'hel-dev-utils';
import pkg from './package.json';

const env = process.env.BUILD_ENV || 'umd';
const plugins = [
    typescript({
        include: [
            'src/**',
        ],
        exclude: [
            'node_modules/**',
            // 'hel_dist/**',
            // 'hel_proxy/**',
            // 'hel_proxy_es/**',
            // 'lib/**',
        ],
        tsconfig: 'tsconfig.json',
        typescript: require('typescript'),
        // resolveJsonModule: true,
        // esModuleInterop: true,
    }),
];

const env2outputConf = {
    es: {
        format: 'es',
        name: pkg.appGroupName,
        file: `${cst.HEL_PROXY_DIR}_es/entry.js`,
    },
    umd: {
        format: 'umd',
        name: pkg.appGroupName,
        file: `${cst.HEL_PROXY_DIR}/entry.js`,
    },
};

const outputObj = env2outputConf[env];

if (process.env.MIN === 'true') {
    plugins.push(terser());
    const [ dirName ] = outputObj.file.split('/');
    outputObj.file = `${dirName}/entry.min.js`;
}

module.exports = {
    input: 'src/entrance/libTypes.ts',
    plugins,
    output: [
        outputObj,
    ],
};
