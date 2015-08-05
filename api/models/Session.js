/**
* Session.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    type: {
      type: 'string'
    },
    start: {
      type: 'date'
    },
    end: {
      type: 'date'
    },
    formation: {
      model: 'Formation'
    },
    trainer: {
      model: 'Trainer'
    },
    client: {
      model: 'contact'
    },
    students: {
      collection: 'student',
      via: 'sessions',
      dominant: true
    },
    contact: {
      model: 'Contact'
    },
    generateDocuments: function(){

    }
  }
};

