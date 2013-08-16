/**
 * Module dependencies.
 */
var Initializer = require('./initializer');

/**
 * Make `app` bootable.
 *
 * This function makes an application bootable.  Booting consists of executing
 * a sequence of phases to initialize the application.
 *
 * Examples:
 *
 *     var app = bootable(express());
 *     app.phase(bootable.initializers());
 *     app.phase(bootable.routes());
 *
 *     app.boot(function(err) {
 *       if (err) { throw err; }
 *       app.listen(3001);
 *     });
 *
 * @param {Object} app
 * @api public
 */
exports = module.exports = function(app, phases) {
  phases = [].slice.call(arguments, 1);
  
  /**
   * Mixin initializer.
   */
  app._initializer = new Initializer();
  
  /**
   * Boot application.
   *
   * @param {Function} cb
   * @api public
   */
  app.boot = function(cb) {
    this._initializer.run(cb);
  }
  
  /**
   * Add phase to boot sequence.
   *
   * @param {Function} fn
   * @return {Object} for chaining
   * @api public
   */
  app.phase = function(fn) {
    this._initializer.phase(fn);
    return this;
  }
  
  
  for (var i = 0; i < phases.length; ++i) {
    app.phase(phases[i]);
  }
  return app;
}


/**
 * Export constructors.
 */
exports.Initializer = Initializer;

/**
 * Export phases.
 */
exports.initializers = require('./phases/initializers');
exports.routes = require('./phases/routes');
