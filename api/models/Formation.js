/**
* Formation.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  attributes: {
    name: {
      type: 'string',
      unique: true,
      required: true
    },
    category: {
      model: 'category'
    },
    brief : {
      type: 'string'
    },
    program : {
      type : 'string'
    },
    slides: {
      type: 'string'
    },
    duration: {
      type: 'integer'
    },
    price: {
      type: 'integer'
    },
    previous: {
      collection: 'formation',
      via: 'previous'
    },
    next: {
      collection: 'formation',
      via: 'next'
    },
    image: {
      type: 'string'
    },
    homePage: {
      type: 'boolean'
    }
  }
};

