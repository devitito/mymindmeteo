/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {

  if (process.env.NODE_ENV !== 'development') {
    //Redirect all http toward https
    var express = require("express"),
        app = express();

    app.get('*', function(req,res) {
      res.redirect('https://' + req.headers.host + req.url)
    }).listen(80);
  }

  ElasticService.connect().then(function() {
      cb()
  });
};
