var gulp = require('gulp');
var gulpImageMin = require('gulp-imagemin');//图片压缩 npm install gulp-imagemin --save-dev
var gulpCssSpriter = require('gulp-css-spriter');//雪碧图 npm install gulp-css-spriter --save-dev
var minifyCSS=require('gulp-minify-css');//雪碧图 npm install gulp-minify-css --save-dev

//设置目录
var entryPath = {
	image:'src/images/',
	css:'src/css/',
	js:'src/'
}
var outPath = {
	image:'./dist/images/',
	css:'./dist/css/',
	js:'./dist/js/'
}

//图片压缩
gulp.task('image-min',function(){
	return  gulp.src(outPath.image + '**')
		    .pipe(gulpImageMin())
		    .pipe(gulp.dest(outPath.image))
});
//生成雪碧图
gulp.task('image-spriter',function(){
	return  (function(){
				var names = ['index'];//main
             //   var timestamp = +new Date();
      
				for(var i = 0,len = names.length; i < len; i++){
					 gulp.src(outPath.css+ names[i] + '.css')// + names[i] + '.css'
				    .pipe(gulpCssSpriter({
				        // 生成的spriter的位置
				        spriteSheet: outPath.image+'/sprite/' + names[i] + '.png',
				        // 生成样式文件图片引用地址的路径
				        pathToSpriteSheetFromCSS: '../images/sprite/' + names[i] + '.png'
				    }))
                   .pipe(minifyCSS({
                        advanced: false,//类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
                        compatibility: 'ie8',//保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
                        keepBreaks: false,//类型：Boolean 默认：false [是否保留换行]
                        keepSpecialComments: '*'
                        //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
                        }))
                     /*
                    .pipe(autoprefixer({
                            browsers:['last 2 Chrome versions', 'Safari >0', 'Explorer >0', 'Edge >0', 'Opera >0', 'Firefox >=20'],
                            cascade:false,
                            remove:false,
                        }))*/
				    .pipe(gulp.dest(outPath.css))
				}
			})();
	
});
//默认执行
gulp.task('default',function(){
	console.log('gulp解决:生成雪碧图，图片压缩')
	gulp.start('image-spriter');//,'image-min'
});