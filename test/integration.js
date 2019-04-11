/*
 © Copyright IBM Corp. 2017, 2018
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */
/**
 * Tests here do not stub out the subgenerators, so for the app generator
 * the real build and refresh subgenerators get called.
 */
'use strict';
const common = require('./common.js');
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const PROJECT_NAME = "ProjectName";
//const services = require("../generators/app/services/services");

describe('core-node-express:app integration test with custom spec', function () {
  // Express build is slow so we need to set a longer timeout for the test
  this.timeout(150000);

  before(function () {
    // Mock the options, set up an output folder and run the generator
    return helpers.run(path.join( __dirname, '../generators/app'))
      .withOptions({
        spec: JSON.stringify({ appname: 'testApp', port: common.defaultPort }),
        bluemix: JSON.stringify({name: PROJECT_NAME}),
        framework: "None"
      })
      .toPromise(); // Get a Promise back when the generator finishes
  });

  describe('basic file structure test', function () {
    // Files which we assert are created each time the app generator is run.
    // Takes an array of files, converted from obj by Object.values().
    const expected = Object.keys(common.file).map((key) => common.file[key]);

    it('generates the expected application files', function () {
      assert.file(expected);
    });
  });

  describe(common.file.local, function () {
    it('contains the custom port', function () {
      assert.jsonFileContent(common.file.local, {port: common.defaultPort});
    });
  });

  describe(common.file.package_json, function () {
    it('check package.json', function () {
      assert.jsonFileContent(common.file.package_json, {
        "version": "1.0.0",
        "description": "A generated IBM Cloud application",
        "private": true,
        "engines": {
          "node": "^8.11.1"
        },
        "scripts": {
          "start": "node $npm_package_config_entrypoint",
          "test": "nyc mocha --exit"
        },
        "dependencies": {
          "appmetrics-dash": "^4.1.0",
          "body-parser": "^1.18.3",
          "express": "^4.16.4",
          "log4js": "^4.0.2"
        },
        "devDependencies": {
          "chai": "^4.2.0",
          "mocha": "^6.0.0",
          "nyc": "^13.3.0"
        }});
    });
  });

  describe(common.file.README_md, function () {
    it('contains default project name', function () {
      // TODO assert.fileContent(common.file.README_md, PROJECT_NAME);
    });

    it('contains IBM Cloud badge', function () {
      assert.fileContent(common.file.README_md,
        '[![](https://img.shields.io/badge/IBM_Cloud-powered-blue.svg)](https://cloud.ibm.com)');
    });
  });

  describe(common.file.server_js, () => {
    it('contains default app name', () => {
      // TODO assert.fileContent(common.file.server_js, 'logger.info(`ProjectName listening on http://localhost:${port}`);')
    });
  });

  describe(common.file.gitignore, function () {
    it('contains node_modules', function () {
      assert.fileContent(common.file.gitignore, 'node_modules');
    });
  });
});

describe('core-node-express:app integration test with custom bluemix', function () {
  // Express build is slow so we need to set a longer timeout for the test
  this.timeout(150000);

  before(function () {
    // Mock the options, set up an output folder and run the generator
    return helpers.run(path.join( __dirname, '../generators/app'))
      .withOptions({
        bluemix: JSON.stringify({ name: PROJECT_NAME}),
        framework: "None"
      })
      .toPromise(); // Get a Promise back when the generator finishes
  });

  describe('basic file structure test', function () {
    // Files which we assert are created each time the app generator is run.
    // Takes an array of files, converted from obj by Object.values().
    const expected = Object.keys(common.file).map((key) => common.file[key]);

    it('generates the expected application files', function () {
      assert.file(expected);
    });
  });

  describe(common.file.local, function () {
    it('contains the default port', function () {
      assert.jsonFileContent(common.file.local, {port: 3000});
    });
  });

  describe(common.file.package_json, function () {
    it('check package.json', function () {
      assert.jsonFileContent(common.file.package_json, {
        "version": "1.0.0",
        "description": "A generated IBM Cloud application",
        "private": true,
        "engines": {
          "node": "^8.11.1"
        },
        "scripts": {
          "start": "node $npm_package_config_entrypoint",
          "test": "nyc mocha --exit"
        },
        "dependencies": {
          "appmetrics-dash": "^4.1.0",
          "body-parser": "^1.18.3",
          "express": "^4.16.4",
          "log4js": "^4.0.2"
        },
        "devDependencies": {
          "chai": "^4.2.0",
          "mocha": "^6.0.0",
          "nyc": "^13.3.0"
        }});
    });
  });

  describe(common.file.README_md, function () {
    it('contains custom project name', function () {
      // TODO assert.fileContent(common.file.README_md, PROJECT_NAME);
    });

    it('contains IBM Cloud badge', function () {
      assert.fileContent(common.file.README_md,
        '[![](https://img.shields.io/badge/IBM_Cloud-powered-blue.svg)](https://cloud.ibm.com)');
    });
  });

  describe(common.file.server_js, () => {
    it('contains custom app name', () => {
      // TODO assert.fileContent(common.file.server_js, 'logger.info(`ProjectName listening on http://localhost:${port}`);')
    });
  });

  describe(common.file.gitignore, function () {
    it('contains node_modules', function () {
      assert.fileContent(common.file.gitignore, 'node_modules');
    });
  });
});

describe('core-node-express:app integration test with custom bluemix and spec', function () {
  // Express build is slow so we need to set a longer timeout for the test
  this.timeout(150000);

  before(function () {
    // Mock the options, set up an output folder and run the generator
    return helpers.run(path.join( __dirname, '../generators/app'))
      .withOptions({
        bluemix: JSON.stringify({ name: PROJECT_NAME}),
        spec: JSON.stringify({port: common.defaultPort}),
        framework: "None"
      })
      .toPromise(); // Get a Promise back when the generator finishes
  });

  describe('basic file structure test', function () {
    // Files which we assert are created each time the app generator is run.
    // Takes an array of files, converted from obj by Object.values().
    const expected = Object.keys(common.file).map((key) => common.file[key]);

    it('generates the expected application files', function () {
      assert.file(expected);
    });
  });

  describe(common.file.local, function () {
    it('contains the custom port', function () {
      assert.jsonFileContent(common.file.local, {port: common.defaultPort});
    });
  });

  describe(common.file.package_json, function () {
    it('check package.json', function () {
      assert.jsonFileContent(common.file.package_json, {
        "version": "1.0.0",
        "description": "A generated IBM Cloud application",
        "private": true,
        "engines": {
          "node": "^8.11.1"
        },
        "scripts": {
          "start": "node $npm_package_config_entrypoint",
          "test": "nyc mocha --exit"
        },
        "dependencies": {
          "appmetrics-dash": "^4.1.0",
          "body-parser": "^1.18.3",
          "express": "^4.16.4",
          "log4js": "^4.0.2"
        },
        "devDependencies": {
          "chai": "^4.2.0",
          "mocha": "^6.0.0",
          "nyc": "^13.3.0"
        }});
    });
  });

  describe(common.file.README_md, function () {
    it('contains custom project name', function () {
      // TODO assert.fileContent(common.file.README_md, PROJECT_NAME);
    });

    it('contains IBM Cloud badge', function () {
      assert.fileContent(common.file.README_md,
        '[![](https://img.shields.io/badge/IBM_Cloud-powered-blue.svg)](https://cloud.ibm.com)');
    });
  });

  describe(common.file.server_js, () => {
    it('contains custom app name', () => {
      // TODO assert.fileContent(common.file.server_js, 'logger.info(`ProjectName listening on http://localhost:${port}`);')
    });
  });

  describe(common.file.gitignore, function () {
    it('contains node_modules', function () {
      assert.fileContent(common.file.gitignore, 'node_modules');
    });
  });
});

describe('core-node-express:app integration test using prompts', function () {
  // Express build is slow so we need to set a longer timeout for the test
  this.timeout(150000);

  before(function () {
    // Mock the options, set up an output folder and run the generator
    return helpers.run(path.join( __dirname, '../generators/app'))
      .withPrompts({
        name: "TEST_APP",
        swaggerFileName: __dirname+"/resources/person_dino.json"})
      .toPromise(); // Get a Promise back when the generator finishes
  });

  describe('basic file structure test', function () {
    // Files which we assert are created each time the app generator is run.
    // Takes an array of files, converted from obj by Object.values().
    const expected = Object.keys(common.fileSwagger).map((key) => common.fileSwagger[key]);

    it('generates the expected application files', function () {
      assert.file(expected);
    });
  });

  describe(common.fileSwagger.local, function () {
    it('contains the custom port', function () {
      assert.jsonFileContent(common.fileSwagger.local, {port: common.defaultPort});
    });
  });

  describe(common.fileSwagger.package_json, function () {
    it('check package.json', function () {
      assert.jsonFileContent(common.fileSwagger.package_json, {
        "version": "1.0.0",
        "description": "A generated IBM Cloud application",
        "private": true,
        "engines": {
          "node": "^8.11.1"
        },
        "scripts": {
          "start": "node $npm_package_config_entrypoint",
          "test": "nyc mocha --exit"
        },
        "dependencies": {
          "appmetrics-dash": "^4.1.0",
          "body-parser": "^1.18.3",
          "express": "^4.16.4",
          "log4js": "^4.0.2"
        },
        "devDependencies": {
          "chai": "^4.2.0",
          "mocha": "^6.0.0",
          "nyc": "^13.3.0"
        }});
    });
  });

  describe(common.fileSwagger.README_md, function () {
    it('contains custom project name', function () {
      // TODO assert.fileContent(common.file.README_md, PROJECT_NAME);
    });

    it('contains IBM Cloud badge', function () {
      assert.fileContent(common.fileSwagger.README_md,
        '[![](https://img.shields.io/badge/IBM_Cloud-powered-blue.svg)](https://cloud.ibm.com)');
    });
  });

  describe(common.fileSwagger.server_js, () => {
    it('contains custom app name', () => {
      // TODO assert.fileContent(common.file.server_js, 'logger.info(`ProjectName listening on http://localhost:${port}`);')
    });
  });

  describe(common.fileSwagger.gitignore, function () {
    it('contains node_modules', function () {
      assert.fileContent(common.fileSwagger.gitignore, 'node_modules');
    });
  });

});


describe('core-node-express:app integration test chose service alert notification', function () {
  // Express build is slow so we need to set a longer timeout for the test
  this.timeout(150000);

  before(function () {

    // Mock the options, set up an output folder and run the generator
    return helpers.run(path.join( __dirname, '../generators/app'))
      .withPrompts({
        name: "TEST_APP",
        addCloudServices: "true",
        services: [ "alert notification" ] })
      .toPromise(); // Get a Promise back when the generator finishes
  });

  describe('basic file structure test', function () {
    it('generates the expected alert notification files', function () {
      assert.file("server/services/service-alert-notification.js");
    });
  });

});

describe('core-node-express:app integration test chose service appid', function () {
  // Express build is slow so we need to set a longer timeout for the test
  this.timeout(150000);

  before(function () {

    // Mock the options, set up an output folder and run the generator
    return helpers.run(path.join( __dirname, '../generators/app'))
      .withPrompts({
        name: "TEST_APP",
        addCloudServices: "true",
        services: [ "appid" ] })
      .toPromise(); // Get a Promise back when the generator finishes
  });

  describe('basic file structure test', function () {
    it('generates the expected appid service files', function () {
      assert.file("server/services/service-appid.js");
    });
  });

});

describe('core-node-express:app integration test chose service cloudant', function () {
  // Express build is slow so we need to set a longer timeout for the test
  this.timeout(150000);

  before(function () {

    // Mock the options, set up an output folder and run the generator
    return helpers.run(path.join( __dirname, '../generators/app'))
      .withPrompts({
        name: "TEST_APP",
        addCloudServices: "true",
        services: [ "cloudant" ] })
      .toPromise(); // Get a Promise back when the generator finishes
  });

  describe('basic file structure test', function () {
    it('generates the expected cloudant service files', function () {
      assert.file("server/services/service-cloudant.js");
    });
  });

});

describe('core-node-express:app integration test chose service mongo', function () {
  // Express build is slow so we need to set a longer timeout for the test
  this.timeout(150000);

  before(function () {

    // Mock the options, set up an output folder and run the generator
    return helpers.run(path.join( __dirname, '../generators/app'))
      .withPrompts({
        name: "TEST_APP",
        addCloudServices: "true",
        services: [ "mongo" ] })
      .toPromise(); // Get a Promise back when the generator finishes
  });

  describe('basic file structure test', function () {
    it('generates the expected mongo service files', function () {
      assert.file("server/services/service-mongodb.js");
    });
  });

});

describe('core-node-express:app integration test chose service object storage', function () {
  // Express build is slow so we need to set a longer timeout for the test
  this.timeout(150000);

  before(function () {

    // Mock the options, set up an output folder and run the generator
    return helpers.run(path.join( __dirname, '../generators/app'))
      .withPrompts({
        name: "TEST_APP",
        addCloudServices: "true",
        services: [ "object storage" ] })
      .toPromise(); // Get a Promise back when the generator finishes
  });

  describe('basic file structure test', function () {
    it('generates the expected object storage service files', function () {
      assert.file("server/services/service-object-storage.js");
    });
  });

});

describe('core-node-express:app integration test chose service postgre', function () {
  // Express build is slow so we need to set a longer timeout for the test
  this.timeout(150000);

  before(function () {

    // Mock the options, set up an output folder and run the generator
    return helpers.run(path.join( __dirname, '../generators/app'))
      .withPrompts({
        name: "TEST_APP",
        addCloudServices: "true",
        services: [ "postgre" ] })
      .toPromise(); // Get a Promise back when the generator finishes
  });

  describe('basic file structure test', function () {
    it('generates the expected postgre service files', function () {
      assert.file("server/services/service-postgre.js");
    });
  });

});

describe('core-node-express:app integration test chose service push', function () {
  // Express build is slow so we need to set a longer timeout for the test
  this.timeout(150000);

  before(function () {

    // Mock the options, set up an output folder and run the generator
    return helpers.run(path.join( __dirname, '../generators/app'))
      .withPrompts({
        name: "TEST_APP",
        addCloudServices: "true",
        services: [ "push" ] })
      .toPromise(); // Get a Promise back when the generator finishes
  });

  describe('basic file structure test', function () {
    it('generates the expected push service files', function () {
      assert.file("server/services/service-push.js");
    });
  });

});

describe('core-node-express:app integration test chose service redis', function () {
  // Express build is slow so we need to set a longer timeout for the test
  this.timeout(150000);

  before(function () {

    // Mock the options, set up an output folder and run the generator
    return helpers.run(path.join( __dirname, '../generators/app'))
      .withPrompts({
        name: "TEST_APP",
        addCloudServices: "true",
        services: [ "redis" ] })
      .toPromise(); // Get a Promise back when the generator finishes
  });

  describe('basic file structure test', function () {
    it('generates the expected redis service files', function () {
      assert.file("server/services/service-redis.js");
    });
  });

});

describe('core-node-express:app integration test chose service watson conversation', function () {
  // Express build is slow so we need to set a longer timeout for the test
  this.timeout(150000);

  before(function () {

    // Mock the options, set up an output folder and run the generator
    return helpers.run(path.join( __dirname, '../generators/app'))
      .withPrompts({
        name: "TEST_APP",
        addCloudServices: "true",
        services: [ "watson conversation" ] })
      .toPromise(); // Get a Promise back when the generator finishes
  });

  describe('basic file structure test', function () {
    it('generates the expected watson service files', function () {
      assert.file("server/services/service-watson-conversation.js");
    });
  });

});
