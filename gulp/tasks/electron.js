var gulp = require('gulp');
var electron = require('gulp-electron');
var packageJson = require('../../package.json');

gulp.task('electron', ['build-dist'], function() {
    gulp.src("")
    .pipe(electron({
        src: './build',
        packageJson: packageJson,
        release: './dist',
        cache: './cache',
        version: 'v0.34.2',
        packaging: false,
        platforms: ['win32-x64'],
        platformResources: {
            win: {
                "version-string": packageJson.version,
                "file-version": packageJson.version,
                "product-version": packageJson.version,
                "icon": 'src/images/EiLogo.ico'
            }
        }
    }))
    .pipe(gulp.dest(""));
});
