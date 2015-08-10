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
  }
};

