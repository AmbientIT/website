var wkhtmltopdf = require('wkhtmltopdf');
var swig = require('swig');
var fs = require('fs');
var path  = require('path');

module.exports = {
  fromSwig: function (name, data, output) {
    console.log(name,data,output);
    return new Promise(function(resolve, reject){
      try{
        if(!data.program){
          data.program = '';
        }
        var template = swig.compileFile(path.join(__dirname,'/../../views/pdf/'+name+'.swig'));
        var html = template({
          formation: data,
          config: sails.config
        });
        console.log(html);
        return wkhtmltopdf(html,{ output: 'assets/pdf/' + output + '.pdf', encoding: 'utf-8' }, function(err){
          return resolve();
        });
      }catch(err){
        return reject(err);
      }
    });
  }
};
