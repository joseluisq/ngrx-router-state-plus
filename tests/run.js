require('ts-node/register')
require('core-js/es7/reflect')
require('zone.js/dist/zone-node.js')
require('zone.js/dist/long-stack-trace-zone.js')
require('zone.js/dist/proxy.js')
require('zone.js/dist/sync-test.js')
require('zone.js/dist/async-test.js')
require('zone.js/dist/fake-async-test.js')

const path = require('path')
const Jasmine = require('jasmine')
const SpecReporter = require('jasmine-spec-reporter').SpecReporter

const runner = new Jasmine()

global.jasmine = runner.jasmine

jasmine.getEnv().clearReporters()
jasmine.getEnv().addReporter(new SpecReporter({
  spec: { displayPending: true },
  summary: { displayDuration: false }
}))

require('zone.js/dist/jasmine-patch.js')

const { getTestBed } = require('@angular/core/testing')
const { ServerTestingModule, platformServerTesting } = require('@angular/platform-server/testing')

getTestBed().initTestEnvironment(ServerTestingModule, platformServerTesting())

runner.loadConfig({
  spec_files: [ path.resolve('tests/**/*[sS]pec.ts') ],
  stopSpecOnExpectationFailure: false,
  random: false
})

runner.execute()
