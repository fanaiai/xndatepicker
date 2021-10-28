const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
module.exports = {
    mode:'development',
    entry: {
        xndatepicker:{
            import:'./src/xndatepicker.js',
        }
    },
    devtool:'eval-source-map',//追踪错误源码
    // devtool:'source-map',//不追踪错误源码
    devServer: {
        contentBase: './dist',
    },
    plugins: [
        new CleanWebpackPlugin({cleanStaleWebpackAssets:true}),
        new HtmlWebpackPlugin({
            template: './index.html',
            // template: './test.html',
        }),
        new UglifyJsPlugin(),
        // new CopyWebpackPlugin({//文件拷贝
        //     patterns: [
        //         {
        //             from: 'src',
        //             globOptions: {
        //                 // ignore:['**/index.html'],//设置忽略,**代表from
        //             },
        //             to: 'public'
        //         }
        //     ]
        // })
    ],
    output: {
        filename: '[name].min.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        environment: {//输出es5的语法，用于兼容ie
            // The environment supports arrow functions ('() => { ... }').
            arrowFunction: false,
            // The environment supports BigInt as literal (123n).
            bigIntLiteral: false,
            // The environment supports const and let for variable declarations.
            const: false,
            // The environment supports destructuring ('{ a, b } = obj').
            destructuring: false,
            // The environment supports an async import() function to import EcmaScript modules.
            dynamicImport: false,
            // The environment supports 'for of' iteration ('for (const x of array) { ... }').
            forOf: false,
            // The environment supports ECMAScript Module syntax to import ECMAScript modules (import ... from '...').
            module: false,
        }
    },
    // optimization: {
    //     moduleIds: 'deterministic',
    //     runtimeChunk: 'single',
    //     splitChunks: {
    //         cacheGroups: {
    //             vendor: {
    //                 test: /[\\/]node_modules[\\/]/,
    //                 name: 'vendors',
    //                 chunks: 'all',
    //             },
    //         },
    //     },
    // },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                options:{
                    presets:[
                        ['babel-preset-env', {
                        targets: {
                            browsers: ['> 1%']
                        },
                        debug:false
                    }]
                    ]
                }
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'fonts/'
                    }
                }
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: '[name][ext]'
                }
            },
        ],
    },
};
