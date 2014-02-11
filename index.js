var ember = require('ember-script');
var path = require('path');
var createEmberPreprocessor = function(args, config, logger, helper) {
  config = config || {};

  var log = logger.create('preprocessor.ember');
  var defaultOptions = {
    bare: true,
    sourceMap: false
  };
  var options = helper.merge(defaultOptions, args.options || {}, config.options || {});

  var transformPath = args.transformPath || config.transformPath || function(filepath) {
    return filepath.replace(/\.em/, '.js');
  };

  return function(content, file, done) {
    var result = null;
    var map;
    var datauri;

    log.debug('Processing "%s".', file.originalPath);
    file.path = transformPath(file.originalPath);

    // Clone the options because ember.compile mutates them
    var opts = helper._.clone(options)

    try {
      result = ember.compile(content, opts);
    } catch (e) {
      log.error('%s\n  at %s:%d', e.message, file.originalPath, e.location);
      return;
    }

    if (result.v3SourceMap) {
      map = JSON.parse(result.v3SourceMap)
      map.sources[0] = path.basename(file.originalPath)
      map.sourcesContent = [content]
      map.file = path.basename(file.path)
      file.sourceMap = map;
      datauri = 'data:application/json;charset=utf-8;base64,' + new Buffer(JSON.stringify(map)).toString('base64')
      done(result.js + '\n//@ sourceMappingURL=' + datauri + '\n');
    } else {
      done(result.js || result)
    }
  };
};

createEmberPreprocessor.$inject = ['args', 'config.emberPreprocessor', 'logger', 'helper'];

// PUBLISH DI MODULE
module.exports = {
  'preprocessor:ember-script': ['factory', createEmberPreprocessor]
};
