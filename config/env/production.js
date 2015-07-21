/**
 * Production environment settings
 *
 * This file can include shared settings for a production environment,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

  /***************************************************************************
   * Set the default database connection for models in the production        *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/

  models: {
     connection: 'mindMeteoDb'
   },

  /***************************************************************************
   * Set the port in the production environment to 443                        *
   ***************************************************************************/

   port: 443,

   ssl: {
     key: require('fs').readFileSync('/home/ubuntu/.ssl/mindmeteo.net.key'),
     cert: require('fs').readFileSync('/home/ubuntu/.ssl/www.mindmeteo.net.crt'),
     passphrase: require('fs').readFileSync('/home/ubuntu/.ssl/mindmeteo.net.passphrase').toString().trim()
   },

  /***************************************************************************
   * Set the log level in production environment to "silent"                 *
   ***************************************************************************/

   log: {
     level: "info"
   }

};
