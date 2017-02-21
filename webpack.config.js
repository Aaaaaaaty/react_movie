const webpack = require('webpack');
const path = require('path');
const ROOT_PATH = path.resolve(__dirname);
const MODULES_PATH = path.join(ROOT_PATH, './node_modules'); // node包目录
const BUILD_PATH = path.join(ROOT_PATH, './dist'); // 最后打包目录
//分离CSS插件
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanPlugin = require('clean-webpack-plugin');//cnpm install clean-webpack-plugin --save-dev
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin



var alias = {
	'jquery':__dirname+'/lib/jquery-1.10.2',//jq
	'jquery-cookie':__dirname+'/lib/jquery.cookie',//jq-cookie
	'jquery-lazyload':__dirname+'/lib/jquery.lazyload',//jq-图片懒加载
	'jquery-qrcode':__dirname+'/lib/jquery.qrcode',//jq-生成二维码
};


module.exports = {
		devtool: 'eval-source-map',
    entry: {
        index: './src/App.js',
        common: ["react","react-dom","jquery"],
    },
    output: {
        path: BUILD_PATH+"/js", // 设置输出目录
        filename: '[name].js', // 输出文件名
    },
   module: {
//加载器配置
		loaders: [
        {
					test: /(\.css|\.scss|\.sass)$/, loaders: ['style-loader', 'css-loader?modules', 'sass-loader?modules']
        },
				{ test: /\.(png|jpg)$/, loader: 'url-loader?limit=1&name=../images/[name].[ext]'},
        { test: /\.jsx?$/,loader: ['babel-loader'],query: {presets: ['es2015','react']}}

		]
	} ,
    resolve:{
		//查找module的话从这里开始查找

		//自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
		extensions: ['','.css','.scss','.js'],
		//模块别名定义，方便后续直接引用别名，无须多写长长的地址
		alias:alias
	},

   plugins:  [
        new webpack.HotModuleReplacementPlugin(),//热加载
        // 把jquery作为全局变量插入到所有的代码中
        // 然后就可以直接在页面中使用jQuery了
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
    /* new webpack.optimize.CommonsChunkPlugin('common.js'),
        new webpack.optimize.CommonsChunkPlugin({
            // 与 entry 对应
            name: 'common',
            // 输出的公共资源名称
            filename: 'common.js',
            // 对所有entry实行这个规则
            minChunks: Infinity
        }),
       */
	      new ExtractTextPlugin("../css/[name].css"),
	      new CleanPlugin(['dist'], {
	        "root": ROOT_PATH,
	        verbose: true,
	        dry: false,
	         exclude: ['index.html']
	       }),
   ],
 devServer: {
        contentBase: './dist',
        port: 3000,
        inline: true,
        hot: true,
        progress:true,
        historyApiFallback:true
    }  /*npm start http://localhost:3000/index.html*/

};
