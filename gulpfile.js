var gulp = require('gulp');
var htmlclean = require('gulp-htmlclean');//html文件压缩
var imagemin = require('gulp-imagemin');//图片压缩
var strip = require('gulp-strip-debug');//去除debug
var uglify = require('gulp-uglify');//压缩js文件
var concat = require('gulp-concat');//拼接js文件
var less = require('gulp-less');//less文件转成css文件
var postcss = require('gulp-postcss');//
var auto = require('autoprefixer');//添加前缀
var cssnano = require('cssnano');//
var connect = require('gulp-connect');//本地服务器,livereload自动刷新页面

var modeFlag = (process.env.NODE_ENV == "development");

var folder = {
    src : 'src/',
    dist: 'dist/'
}

gulp.task('img',function(){
    
    gulp.src(folder.src + 'img/*')
        .pipe(connect.reload())
        .pipe(imagemin())
        .pipe(gulp.dest(folder.dist + 'img'))
})

gulp.task('html',function(){
    console.log('I am html!!');
    var page = gulp.src(folder.src + 'html/*')
        .pipe(connect.reload())
        if(!modeFlag){
           page.pipe(htmlclean()) 
        }
    
        page.pipe(gulp.dest(folder.dist + 'html'))
})

gulp.task('css',function(){
    var options = [auto(),cssnano()];
    var page = gulp.src(folder.src + 'css/*')
        .pipe(connect.reload())
        if(!modeFlag){
            page.pipe(less())
            .pipe(postcss(options))
        }       
        page.pipe(gulp.dest(folder.dist + 'css'))
})
gulp.task('js', function () {
    var page = gulp.src(folder.src + 'js/*')
        .pipe(connect.reload())
        .pipe(concat('main.js'))
        if(!modeFlag){
            page.pipe(uglify())
            .pipe(strip())
        }
        page.pipe(gulp.dest(folder.dist + 'js'))
})
gulp.task('server',function(){
    connect.server({
        port: '8090',
        livereload: true
    });
})
gulp.task('watch',function(){
    gulp.watch(folder.src + 'html/*', ['html']);
    gulp.watch(folder.src + 'css/*' ,[ 'css']);
    gulp.watch(folder.src + 'img/*' , ['img']);
})
gulp.task('default',['html','css','img','js','server','watch']);