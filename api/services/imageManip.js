/**
 * imageManipService
 *
 * @description :: Image manipulation and upload to the cloud
 * @help        :: https://github.com/sahat/satellizer/blob/master/examples/server/node/server.js
 */
var path = require('path');
var easyimg = require('easyimage');
var fs = require('fs-promise');

module.exports = {
  resizeAvatar : function(data){
    console.log(data);
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
  }
};
