var gulp = require('gulp');
var watch = require('gulp-watch');
var babel = require('gulp-babel');
var livereload = require('gulp-livereload');
var electron = require('electron-connect').server.create({
  path: './build'
});

gulp.task('watch', ['build'], function(){
  electron.start();
  gulp.watch('src/**/*.html', ['copy-html', electron.reload]);
  gulp.watch('src/**/*.js', ['babelify-files', electron.reload]);
  gulp.watch('src/**/*.jsx', ['babelify-files', electron.reload]);
  gulp.watch('src/**/*.less', ['less', electron.reload]);
  gulp.watch('src/**/*.json', ['copy-other-files', electron.reload]);
});
