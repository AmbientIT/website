var gulp = require('gulp');
var rsync = require('gulp-rsync');
var fs = require('fs');
var exec = require('gulp-exec');
var runSequence = require('run-sequence');
var GulpSSH = require('gulp-ssh');
var growl = require('notify-send');


gulp.task('serveur:rsync', function(done){
  gulp.src(["."])
    .pipe(rsync(require('./deployconfig.json')));
});

gulp.task('deploy', function(done) {
  runSequence('server:rsync','server:install-dep','server:restart',done)
});


gulp.task('nodemon-notif', function(){
  growl.normal.timeout(3000).icon('/usr/share/pixmaps/nodemon.png').category('nodemon').notify('Nodemon restart sails app', 'nodemon detect one or more file have changed');
});


var config = {
  host: '40.114.241.204',
  port: 25015,
  username: 'SitePreProd',
  privateKey: fs.readFileSync('/home/charl/.ssh/AmbientPreProd')
};

gulp.task('server:install-dep',function () {
  var gulpSSH = new GulpSSH({
    ignoreErrors: false,
    sshConfig: config
  });
  return gulpSSH
    .shell(['cd /home/SitePreProd/ambient-it-website', 'npm install', 'npm update'], {filePath: 'shell.log'})
    .pipe(gulp.dest('logs'));
});

gulp.task('server:restart',function () {
  var gulpSSH = new GulpSSH({
    ignoreErrors: false,
    sshConfig: config
  });
  return gulpSSH
    .shell(['cd /home/SitePreProd/ambient-it-website', 'pm2 restart app'], {filePath: 'shell.log'})
    .pipe(gulp.dest('logs'));
});
