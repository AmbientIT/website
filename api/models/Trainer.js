/**
* Trainer.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    firstName: {
      type: 'string'
    },
    lastName: {
      type: 'string'
    },
    displayName: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    price: {
      type: 'integer'
    },
    user: {
      model: 'User'
    },
    formations: {
      collection: 'formation',
      via: 'trainers'
    },
    home: {
      type: 'boolean'
    }
  }
};

