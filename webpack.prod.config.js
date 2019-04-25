const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/app.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: 'tsconfig.prod.json'
                        }
                    }
                ],
                exclude: /node_modules/
            }
        ]
    },
    target: 'node',
    mode: "production",
    node: {
        net: 'empty',
        fs: 'empty'
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    },
    plugins: [
        new CopyPlugin([
            { from: '.env' }
        ])
    ]
};