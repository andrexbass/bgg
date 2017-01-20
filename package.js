Package.describe({
  name: 'andrexbass:bgg',
  version: '0.1.0',
  // Brief, one-line summary of the package.
  summary: 'meteor package with integration for api boardgamegeek',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/andrexbass/bgg.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.4.2.3');
  api.use('ecmascript');
  api.use('peerlibrary:xml2js@0.4.8_1');
  api.mainModule('bgg.js');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('andrexbass:bgg');
  api.mainModule('bgg-tests.js');
});
