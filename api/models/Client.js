/**
* Client.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true,
      unique: true,
      index: true
    },
    sessions: {
      collection: 'Session',
      via: 'client'
    },
    contacts: {
      collection: 'Contact',
      via: 'client'
    },
    site: {
      type: 'string'
    }
  }
};

