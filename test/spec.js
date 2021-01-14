const Application = require('spectron').Application;
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const assert = require('assert');
const electronPath = require('electron');
const path = require('path');

chai.should();
chai.use(chaiAsPromised);

describe('Application launch', function () {
    this.timeout(10000);

    beforeEach(function () {
        app = new Application({
            path: electronPath,
            env: {
                ELECTRON_ENV: 'test'
            },
            args: [path.join(__dirname, '../dist/app.js')]
        });
        
        chaiAsPromised.transferPromiseness = app.transferPromiseness;
        return app.start();
    });

    afterEach(function () {
        if (app && app.isRunning()) {
            return app.stop();
        }
    });

    it('shows an initial window', function () {
        return app.client.getWindowCount().then(function (count) {
            assert.strictEqual(count,1);
        });
    });
});