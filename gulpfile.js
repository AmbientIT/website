var gulp = require('gulp');
var rsync = require('gulp-rsync');
var fs = require('fs');
var exec = require('gulp-exec');
var runSequence = require('run-sequence');
var GulpSSH = require('gulp-ssh');
var growl = require('notify-send');

gulp.task('nodemon-notif', function(){
  growl.normal.timeout(3000).icon('/usr/share/pixmaps/nodemon.png').category('nodemon').notify('Nodemon restart sails app', 'nodemon detect one or more file have changed');
});

var config = require('./deployconfig.json');

gulp.task('deploy', function(done){
  gulp.src(["."])
    .pipe(rsync(require('./deployconfig.json')));
});

gulp.task('start-server',function () {
  var gulpSSH = new GulpSSH({
    ignoreErrors: false,
    sshConfig: config
  });
  return gulpSSH
    .shell(['cd '+config.destination, 'npm start'], {filePath: 'shell.log'})
    .pipe(gulp.dest('logs'));
});
