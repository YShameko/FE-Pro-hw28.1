const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const CssPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index.jsx',

    output: {
        path: path.resolve(__dirname, 'client'),
        filename: 'bundle[fullhash].js',
        clean: true, 
        // publicPath: '/',
    },

    resolve: {
        extensions: ['.js', '.jsx'],
    },

    mode: 'development',

    plugins: [
        new HtmlPlugin({
            template: './src/index.html'
        }),
        // new CopyWebpackPlugin({
        //     patterns: [
        //         { from: './src/style.css', to: './'}
        //     ]
        // }),
        new CssPlugin({
            filename: 'style[fullhash].css'
        }),
    ],

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        "presets": [
                            ["@babel/preset-env"],
                            ["@babel/preset-react"]
                        ]
                    }
                }
            },
            {
                test: /\.css$/, 
                use: [
                    CssPlugin.loader, 
                    'css-loader'
                ],
            },
        ]
    },

    devServer: {
        port: 5000,
        static: {
            directory: path.join(__dirname, 'client')
        },
        devMiddleware: {
            writeToDisk: true
        },
        open: true,
        historyApiFallback: true
    }
}
