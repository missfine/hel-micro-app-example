/* global module __dirname process */
const path = require('path');
const fs = require('fs');
const CracoEsbuildPlugin = require('craco-esbuild');
const appDirectory = fs.realpathSync(process.cwd());

const subApp = require('./config/subApp');
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const configureWebpack = (webpackConfig) => {

    console.log('config', subApp.getPublicPathOrUrl('http://localhost:9000'));

    webpackConfig.output = {
        ...webpackConfig.output,
        path: resolveApp(subApp.distDir),
        // publicPath: subApp.getPublicPathOrUrl('http://localhost:9000'),
        chunkLoadingGlobal: subApp.jsonpFnName
    };
    webpackConfig.externals = {
        ...webpackConfig.externals,
        ...subApp.externals,
        react: 'React',
        'react-is': 'ReactIs',
        'react-dom': 'ReactDOM',
        'react-dom/client': 'ReactDOM',
        moment: 'moment',
        antd: 'antd',
    };
    return webpackConfig;
};

const imageInlineSizeLimit = parseInt(
    process.env.IMAGE_INLINE_SIZE_LIMIT || '10240'
);

module.exports = {
    devServer: {
        host: 'localhost',
        port: 9000,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Credentials': 'true',
        },
        open: [],
        // hot: false,
        // liveReload: true,
    },
    webpack: {
        alias: {
            'src': path.resolve(__dirname, './src'),
        },
        module: {
            rules: [
                {
                    test: /\.(bmp|gif|jpe?g|png|svg)$/,
                    type: 'asset',
                    parser: {
                        dataUrlCondition: {
                            maxSize: imageInlineSizeLimit || 10 * 1024
                        }
                    }
                },
            ]
        },
        configure: configureWebpack,
    },
    babel: {
        plugins: [
            [ 'import', { libraryName: 'antd', style: 'css' } ],
        ]
    },
    plugins: [
        {
            plugin: CracoEsbuildPlugin,
            options: {
                esbuildLoaderOptions: {
                    loader: 'tsx',
                    target: 'es2015',
                },
                esbuildMinimizerOptions: {
                    target: 'es2015',
                    //OptimizeCssAssetsWebpackPlugin替换为esbuild
                    css: true,
                },
                // Optional. Set to true if you want to use babel for jest tests,
                skipEsbuildJest: false,
                esbuildJestOptions: {
                    loaders: {
                        '.ts': 'ts',
                        '.tsx': 'tsx',
                    },
                },
            },
        }
    ]
};
