'use strict';

var gulp		= require('gulp'),
	$			= require('gulp-load-plugins')(),
	del			= require('del'),
	browserSync = require('browser-sync');

var paths = {
	scripts: ['src/js/app.js'],
	styles: 'src/css/**/*.scss',
	images: 'src/image/**/*.{png,jpeg,jpg,gif}',
	extras: ['src/*.*', 'src/fonts/**/*'],
	dest: {
		scripts : 'dist/js',
		styles: 'dist/css',
		images: 'dist/image',
		extras: 'dist/'
	}
};

// gulp.task('lint', function () {
// 	return gulp.src(['src/js/app.js'])
// 		.pipe($.jshint())
// 		.pipe($.jshint.reporter('jshint-stylish'));
// });

gulp.task('scripts', function () {
	var file = 'app.js';

	return gulp.src(paths.scripts)
		.pipe($.plumber())
		.pipe($.newer(paths.dest.scripts + file))
		.pipe($.uglifyjs(file, {
			outSourceMap: !$.util.env.production,
			sourceRoot: '../'
		}))
		.pipe(gulp.dest(paths.dest.scripts));
});

gulp.task('styles', function () {
	return gulp.src(paths.styles)
		.pipe($.plumber())
		.pipe($.newer({dest: paths.dest.styles + 'style.css', ext: '.css'}))
		/* .pipe($.rubySass({
			noCache: true,
			style: 'compressed'
		})) */
		// .pipe($.util.env.production ? $.util.noop())
		.pipe($.sass({
			errLogToConsole: true,
			sourceComments: !$.util.env.production,
			outputStyle: $.util.env.production ? 'compressed' : 'nested'
		}))
		.pipe($.autoprefixer('last 2 version'))
		//.pipe($.csso())
		.pipe(gulp.dest(paths.dest.styles));

	// return $.rubySass('src/css/', {
	// 		sourcemap: ! $.util.env.production,
	// 		style: $.util.env.production ? 'compressed' : 'nested'
	// 	})
	// 	.on('error', $.sass.logError)
	// 	.pipe($.plumber())
	// 	.pipe($.autoprefixer())
	// 	.pipe($.sourcemaps.write('.'))
	// 	.pipe(gulp.dest(paths.dest));
});

gulp.task('images', function () {
	return gulp.src(paths.images)
		.pipe($.plumber())
		.pipe($.newer(paths.dest.images))
		.pipe($.imagemin({
			optimizationLevel: 5,
			progressive: true,
			interlaced: true
		}))
		.pipe(gulp.dest(paths.dest.images));
});

gulp.task('extras', function () {
	return gulp.src(paths.extras, { base: 'src' })
		.pipe($.newer(paths.dest.extras))
		.pipe(gulp.dest(paths.dest.extras));
});

gulp.task('clean', function (cb) {
	del(paths.dest.extras, cb);
});

gulp.task('serve', ['watch'], function () {
	browserSync({
		files: [ 'dist/**', '!dist/**/*.map' ],
		server:{
			baseDir: ['dist','./']
		},
		//proxy: 'onthestop',
		open: !$.util.env.no
	});
});

gulp.task('watch', ['scripts', 'styles', 'images', 'extras'], function() {
	gulp.watch(paths.scripts, ['scripts']);
	gulp.watch(paths.styles, ['styles']);
	gulp.watch(paths.images, ['images']);
	gulp.watch(paths.extras, ['extras']);
});

gulp.task('default', ['clean'], function () {
	gulp.start('serve');
});