
/**
 * MediaController
 *
 * @description :: Server-side logic for managing upload
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var fs = require('fs');

module.exports = {
  base64AndCreateMedia : function(req,res){
    req.file('file').upload(function(err,data){
      if(err){
        return res.serverError(err);
      }
      var base64;
      try{
        base64 = fs.readFileSync(data[0].fd).toString("base64");
      }catch(e){
        return res.serverError(err)
      }
      Media.create({
        file: base64,
        size: data[0].size,
        type: data[0].type,
        originalName: data[0].filename
      })
        .then(function(media){
          res.json(media)
        });

    })
  }
};

