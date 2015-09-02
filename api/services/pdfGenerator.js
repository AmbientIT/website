var wkhtmltopdf = require('wkhtmltopdf');
var ejs = require('ejs');
var fs = require('fs');

module.exports = {
  fromEjs: function (template, data, output) {
    return new Promise(function(resolve, reject){
      try{
        var file = fs.readFileSync(__dirname + '/../../views/pdf/'+template+'.ejs','utf-8');
        if(!data.program){
          data.program = '';
        }
        var html = ejs.render(file, {locals: data});
        return wkhtmltopdf(html,{ output: 'assets/pdf/' + output + '.pdf', encoding: 'utf-8' }, function(err){
          return resolve();
        });
      }catch(err){
        return reject(err);
      }
    });
  }
};
