/**
 * imageManipService
 *
 * @description :: Image manipulation and upload to the cloud
 * @help        :: https://www.npmjs.com/package/easyimage
 */
var path = require('path');
var easyimg = require('easyimage');
var fs = require('fs-promise');

module.exports = {
  resizeAvatar : function(data){
    return easyimg
      .resize({
        src: data.fd,
        dst: data.fd,
        width: sails.config.image.avatar.width,
        height: sails.config.image.avatar.height
      })

  },
  uploadToS3: function (filedata){

  },
  toBase64: function(path){
    return fs.readFile(path)
      .then(function(file) {
        return new Buffer(file).toString('base64');
      })
  },
  thumbnailize: function(src, dest){
    return new Promise(function(resolve, reject){
      easyimg
        .resize({
          src: src,
          dst: dest,
          width: sails.config.image.thumb.width,
        }, function(err, data){
          if(err){
            reject(err);
          }else{
            resolve(data);
          }
        })
    })
  }
};
