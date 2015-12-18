var merge = require('merge-stream');
var _ = require('underscore');
var gulp = require('gulp');
var useref = require('gulp-useref');
var babel = require('gulp-babel');
var less = require('gulp-less');
var lessGlob = require('less-plugin-glob');
var sourcemaps = require('gulp-sourcemaps');
var packageJson = require('../../package.json');
var babelConfig = {
  stage: 0,
  optional: ['runtime'],
  sourceMaps: 'inline',
  env: {
   plugins: ["react-transform"],
   extra: {
     "react-transform": {
       "transforms": [{
         "transform": "./src/transform/catchErrors.js",
       }]
     }
   }
  }
};

gulp.task('copy-modules', function(){
  var node_modules = _.compact(Object.keys(packageJson.dependencies).map(function(dep) {
    if(dep !== 'electron-prebuilt'){
      return 'node_modules/' + dep + '/**/*';
    }
  }));
  return gulp.src(['package.json'].concat(node_modules), {base: "."})
             .pipe(gulp.dest('build'));
});

gulp.task('babelify-files', function(){
  var sourcemapWrite = {};
  return gulp.src(['src/**/*.js', 'src/**/*.jsx', '!src/vendor/**/*.js'])
             .pipe(babel(babelConfig))
             .pipe(gulp.dest('build'));
});

gulp.task('copy-html', function(){
  return gulp.src('src/**/*.html').pipe(gulp.dest('build'));
});

gulp.task('copy-html-dist', function(){
  return gulp.src('src/**/*.html')
             .pipe(useref())
             .pipe(gulp.dest('build'));
});

gulp.task('copy-other-files', function(){
  return merge(
    gulp.src('src/icons.gif').pipe(gulp.dest('build')),
    gulp.src('src/vendor/**/*.js').pipe(gulp.dest('build/vendor')),
    gulp.src('node_modules/codemirror/lib/*.css').pipe(gulp.dest('build/codemirror')),
    gulp.src('node_modules/codemirror/lib/*.js').pipe(gulp.dest('build/codemirror')),
    gulp.src('node_modules/codemirror/mode/javascript/javascript.js').pipe(gulp.dest('build/codemirror')),
    gulp.src('node_modules/font-awesome/**/*').pipe(gulp.dest('build/font-awesome')),
    gulp.src('src/**/*.json').pipe(gulp.dest('build')),
    gulp.src('src/**/*.css').pipe(gulp.dest('build')),
    gulp.src('src/images/**/*', {base: 'src'}).pipe(gulp.dest('build'))
  );
});

gulp.task('less', function(){
  return gulp.src('src/**/*.less').pipe(less({
    plugins: [lessGlob],
    paths: [
     './src',
     './node_modules/bootstrap-less',
     './node_modules/main-menu/build']
  })).pipe(gulp.dest('build'));
});

gulp.task('build-no-modules', ['babelify-files', 'copy-other-files', 'copy-html', 'less']);
gulp.task('build-dist', ['copy-modules', 'babelify-files', 'copy-other-files', 'copy-html-dist', 'less']);
gulp.task('build', ['copy-modules', 'babelify-files', 'copy-other-files', 'copy-html', 'less']);
