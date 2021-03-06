# karma-ember-script-preprocessor

> Preprocessor to compile EmberScript on the fly.

## Installation

**This plugin ships with Karma by default, so you don't need to install it, it should just work ;-)**

The easiest way is to keep `karma-ember-script-preprocessor` as a devDependency in your `package.json`.
```json
{
  "devDependencies": {
    "karma": "~0.10",
    "karma-ember-script-preprocessor": "~0.1"
  }
}
```

You can simple do it by:
```bash
npm install karma-ember-script-preprocessor --save-dev
```

## Configuration
Following code shows the default configuration...
```js
// karma.conf.js
module.exports = function(config) {
  config.set({
    preprocessors: {
      '**/*.em': ['ember-script']
    },

    emberScriptPreprocessor: {
      // options passed to the ember script compiler
      options: {
        bare: true,
        sourceMap: false
      },
      // transforming the filenames
      transformPath: function(path) {
        return path.replace(/\.ember/, '.js');
      }
    }
  });
};
```

If you set the `sourceMap` coffee compiler option to `true` then the generated source map will be inlined as a data-uri.

----

For more information on Karma see the [homepage].


[homepage]: http://karma-runner.github.com
