// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by bgg.js.
import { name as packageName } from "meteor/andrexbass:bgg";

// Write your tests here!
// Here is an example.
Tinytest.add('bgg - example', function (test) {
  test.equal(packageName, "bgg");
});
