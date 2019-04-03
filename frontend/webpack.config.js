const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const worker = require.resolve('pdfjs-dist/build/pdf.worker.entry');

module.exports = (env, options) => {
    return {
        mode: "production",
        entry: {
            'main': path.resolve(__dirname, "./src/index.jsx"),
            'pdf.worker': worker
        },
        output: {
            path: path.resolve(__dirname, './dist'),
            publicPath: '',
            filename: '[name].bundle.js',
        },
        module: {
            rules: [
                { 
                    test: /\.(js|jsx)$/,
                    use: 'babel-loader',
                    exclude: '/node_modules/'
                },
                {
                    test: /\.(pdf)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]'
                            }
                        }
                    ]
                }
            ]
        },
        resolve: {
            extensions: ['.js', '.jsx']
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, './src/index.html')
            })
        ]
    }
}