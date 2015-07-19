var gulp = require('gulp');
var rsync = require('gulp-rsync');
var fs = require('fs');
var exec = require('gulp-exec');
var runSequence = require('run-sequence');
var GulpSSH = require('gulp-ssh');


gulp.task('rsync', function(done){
  gulp.src(["."])
    .pipe(rsync(require('./deployconfig.json')));
});

gulp.task('deploy', function(done) {
  runSequence('rsync','install-dep',done)
});

//todo error with ng-admin :'(
gulp.task('build-admin', function(){
  gulp.src('./')
    .pipe(exec('jspm bundle-sfx src/main main.js', {
      continueOnError: false,
      pipeStdout: false,
      customTemplatingThing: "test"
    }))
    .pipe(exec.reporter({
      err: true,
      stderr: true,
      stdout: true
    }));
});

gulp.task('install-dep',function () {
  var config = {
    host: '40.114.241.204',
    port: 25015,
    username: 'SitePreProd',
    privateKey: fs.readFileSync('/home/charl/.ssh/AmbientPreProd')
  };

  var gulpSSH = new GulpSSH({
    ignoreErrors: false,
    sshConfig: config
  });

  return gulpSSH
    .shell(['cd /home/SitePreProd/ambient-it-website', 'npm install', 'npm update','pm2 restart app.js'], {filePath: 'shell.log'})
    .pipe(gulp.dest('logs'));
});
