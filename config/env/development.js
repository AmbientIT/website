/**
 * Development environment settings
 *
 * This file can include shared settings for a development team,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

  /***************************************************************************
   * Set the default database connection for models in the development       *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/
  TOKEN_SECRET: process.env.TOKEN_SECRET || 'A hard to guess string',
  GOOGLE_SECRET: process.env.GOOGLE_SECRET || 'lh-ml0swLWA05UW2qUG-s1Dm',
  email: {
    service: 'Gmail',
    auth:{
      user: 'charles.jacquin@ambient-it.net',
      pass: 'ambient4tw'
    },
    from: 'no-reply@ambient-it.net'
  },
  image: {
    avatar: {
      width: 60,
      height: 60
    }
  }
  // models: {
  //   connection: 'someMongodbServer'
  // }

};
