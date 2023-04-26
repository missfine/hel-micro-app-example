/* global module __dirname process */
const path = require('path');
const fs = require('fs');
const CracoEsbuildPlugin = require('craco-esbuild');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const configureWebpack = (webpackConfig, { env, paths }) => {
    const isEnvDevelopment = env === 'development';
    const isEnvProduction = env === 'production';

    //配置HtmlWebpackPlugin用来产生一个独立的HTML
    const mkHtmlWebpackPlugin = (chunks, filename) => {
        return new HtmlWebpackPlugin({
            inject: true,
            template: paths.appHtml,
            chunks,
            filename,
            ...isEnvProduction ? {
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    keepClosingSlash: true,
                    minifyJS: true,
                    minifyCSS: true,
                    minifyURLs: true,
                }
            } : undefined
        });
    };

    //遍历src/entries下子目录, 每个目录取其index文件生成入口, 配置相应HtmlWebpackPlugin
    const entriesDir = path.join(paths.appSrc, 'entries');
    const fileNames = fs.readdirSync(entriesDir);
    const { entries, htmlWebpackPlugins } = fileNames.reduce((configs, fileName) => {
        //获取子目录完整路径
        const filePath = path.join(entriesDir, fileName);
        //跳过文件
        if (!fs.statSync(filePath).isDirectory()) { return configs; }
        const { entries, htmlWebpackPlugins } = configs;
        //添加新入口 入口名称 -> 入口js文件路径
        entries[fileName] = path.join(filePath, 'index.js');
        //添加相应入口html文件处理插件
        htmlWebpackPlugins.push(mkHtmlWebpackPlugin([ fileName ], fileName + '.html'));
        return { entries, htmlWebpackPlugins };
    }, { entries: {}, htmlWebpackPlugins: [] });

    //原入口命名为main
    webpackConfig.entry = {
        main: webpackConfig.entry,
        ...entries
    };

    //调整html插件
    const htmlWebpackPluginIndex = webpackConfig.plugins.findIndex(plugin => plugin instanceof HtmlWebpackPlugin);
    webpackConfig.plugins.splice(htmlWebpackPluginIndex, 1, mkHtmlWebpackPlugin([ 'main' ], 'index.html'), ...htmlWebpackPlugins);

    //开发环境下 需要将多入口的文件根据名称进行切分
    if (isEnvDevelopment) {
        webpackConfig.output.filename = 'static/js/[name].bundle.js';
    }

    //共用runtime bundle
    webpackConfig.optimization.runtimeChunk = 'single';

    return webpackConfig;
};

const imageInlineSizeLimit = parseInt(
    process.env.IMAGE_INLINE_SIZE_LIMIT || '10240'
);

module.exports = {
    devServer: {
        host: 'localhost',
        port: 8989,
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
