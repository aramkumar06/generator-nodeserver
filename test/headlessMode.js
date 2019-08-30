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
// const PROJECT_NAME = "ProjectName";

describe('Headless mode: app integration test with custom spec', function () {
  // Express build is slow so we need to set a longer timeout for the test
  this.timeout(150000);

  before(function () {
    // Mock the options, set up an output folder and run the generator
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({
        headless: JSON.stringify({ name: 'project' })
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
      assert.jsonFileContent(common.file.local, { port: common.defaultPort });
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
        }
      });
    });
  });

  describe(common.file.README_md, function () {
    it('contains IBM Cloud badge', function () {
      assert.fileContent(common.file.README_md,
        '[![](https://img.shields.io/badge/IBM_Cloud-powered-blue.svg)](https://cloud.ibm.com)');
    });
  });

  describe(common.file.gitignore, function () {
    it('contains node_modules', function () {
      assert.fileContent(common.file.gitignore, 'node_modules');
    });
  });
});

describe('Headless mode: app integration test using headless mode (with Swagger file)', function () {
  // Express build is slow so we need to set a longer timeout for the test
  this.timeout(150000);

  before(function () {
    // Mock the options, set up an output folder and run the generator
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({
        headless: JSON.stringify({ name: 'TEST_APP', swaggerFileName: __dirname + "/resources/person_dino.json" })
      })
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
      assert.jsonFileContent(common.fileSwagger.local, { port: common.defaultPort });
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
        }
      });
    });
  });

  describe(common.fileSwagger.README_md, function () {
    it('contains custom project name', function () {
      assert.fileContent(common.file.README_md, "TEST_APP");
    });

    it('contains Cloud badge', function () {
      assert.fileContent(common.fileSwagger.README_md,
        '[![](https://img.shields.io/badge/IBM_Cloud-powered-blue.svg)](https://cloud.ibm.com)');
    });
  });

  describe(common.fileSwagger.gitignore, function () {
    it('contains node_modules', function () {
      assert.fileContent(common.fileSwagger.gitignore, 'node_modules');
    });
  });

});

describe('Headless mode: app integration test chose service watson conversation', function () {
  // Express build is slow so we need to set a longer timeout for the test
  this.timeout(150000);

  before(function () {

    // Mock the options, set up an output folder and run the generator
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({
        headless: JSON.stringify({ name: 'project', services: ["watson conversation"] })
      })
      .toPromise(); // Get a Promise back when the generator finishes
  });

  describe('basic file structure test', function () {
    it('generates the expected application files', function () {
      assert.file("server/services/service-watson-conversation.js");
    });
  });

});

describe('Headless mode: app integration test chose services redis and appid', function () {
  // Express build is slow so we need to set a longer timeout for the test
  this.timeout(150000);

  before(function () {

    // Mock the options, set up an output folder and run the generator
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({
        headless: JSON.stringify({ name: 'project', services: ["redis", "appid"] })
      })
      .toPromise(); // Get a Promise back when the generator finishes
  });

  describe('basic file structure test for redis service', function () {
    it('generates the expected application files', function () {
      assert.file("server/services/service-redis.js");
    });
  });

  describe('basic file structure test for appid service', function () {
    it('generates the expected application files', function () {
      assert.file("server/services/service-appid.js");
    });
  });

});
