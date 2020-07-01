let gulp = require("gulp"),
    sass = require("gulp-sass"),
    browserSync = require("browser-sync"),
    uglify = require("gulp-uglify"),
    concat = require("gulp-concat"),
    rename = require("gulp-rename");

//задания для gulp
gulp.task("scss", function(){
    return gulp.src("app/scss/**/*.scss")
    .pipe(sass({outputStyle:"expanded"}))
    .pipe(rename({suffix: ".min"}))
    .pipe(gulp.dest("app/css"))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task("css", function(){
  return gulp.src([
    "node_modules/normalize.css/normalize.css",
    "node_modules/slick-carousel/slick/slick.css",
    "node_modules/magnific-popup/dist/magnific-popup.css",
  ])
  .pipe(concat("libs.min.css"))
	.pipe(gulp.dest("app/css"))
	.pipe(browserSync.reload({stream:true}))
});

gulp.task("html",function(){
	return gulp.src("app/*.html")
	.pipe(browserSync.reload({stream:true}))
});
//для слежения за  html файлом

gulp.task("js", function(){
	return gulp.src([
    "node_modules/jquery/dist/jquery.js",
    "node_modules/slick-carousel/slick/slick.js",
    "node_modules/magnific-popup/dist/jquery.magnific-popup.js",
	])
	.pipe(concat("libs.min.js"))
	.pipe(uglify())
	.pipe(gulp.dest("app/js"))
	.pipe(browserSync.reload({stream:true}))
});

gulp.task("script",function(){
	return gulp.src("app/js/*.js")
	.pipe(browserSync.reload({stream:true}))
});
//для js

gulp.task("watch", function(){
	gulp.watch("app/scss/**/*.scss", gulp.parallel("scss"))
	gulp.watch("app/*.html", gulp.parallel("html"))
	gulp.watch("app/js/*.js", gulp.parallel("script"))
});
//gulp.parallel = если что-то произходит что-то он перезаписует 
//выше указаный task  для того чтобы переводило из scss в css автоматически


gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "app"
        }
    });
});

gulp.task("default", gulp.parallel("css","scss", "js", "browser-sync", "watch"));