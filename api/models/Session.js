/**
* Session.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    start: {
      type: 'date'
    },
    end: {
      type: 'date'
    },
    name: {
      type:'string'
    },
    formation: {
      model: 'Formation'
    },
    trainer: {
      model: 'Trainer'
    },
    client: {
      model: 'Client'
    },
    students: {
      collection: 'student',
      via: 'sessions',
      dominant: true
    },
    generateDocuments: function(){

    }
  },
  beforeCreate: function(obj,cb){
    obj.name = obj.formation + ' ' +obj.start;
    cb(null,obj);
  }
};

