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

gulp.task('server:rsync',function(){
  gulp.src(["."])
    .pipe(rsync(config))
});

gulp.task('server:start',function () {
  var gulpSSH = new GulpSSH({
    ignoreErrors: false,
    sshConfig: {
      host: config.hostname,
      port: config.port,
      username: config.username,
      privateKey: fs.readFileSync('/home/charl/.ssh/AmbientProd')
    }
  });
  return gulpSSH
    .shell(['cd '+config.destination, 'npm start'], {filePath: 'shell.log'})
    .pipe(gulp.dest('logs'));
});

gulp.task('deploy',['server:rsync']);

gulp.task('start',['server:start']);
