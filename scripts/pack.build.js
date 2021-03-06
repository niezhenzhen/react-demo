const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const baseConfig = require('./pack.base');

const buildConfig = merge(baseConfig, {
    mode: 'production',
    devtool: false,
    output: {
        path: path.join(__dirname, '../build'),
        filename: '[name].[chunkhash:8].js',
        publicPath: '/public/'
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'prop-types': 'PropTypes',
        'redux': 'Redux',
        'axios': 'axios',
        'antd': 'antd',
        // 'echarts': 'echarts',
        'moment': 'moment',
        'moment/locale/zh-cn': 'moment.locale',
        'numbro': 'numbro',
        'lodash': {
            commonjs: 'lodash',
            amd: 'lodash',
            root: '_'
        }
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../public'),
                to: path.resolve(__dirname, '../build'),
                ignore: ['.*']
            }
        ]),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ],
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    ecma: 6,
                    compress: true,
                    output: {
                        comments: false,
                        beautify: false
                    }
                }
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    }
});

module.exports = buildConfig;
