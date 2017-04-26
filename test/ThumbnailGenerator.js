/* eslint-disable */

import { assert, expect } from 'chai';
import sinon from 'sinon';
import Promise from 'bluebird';
import ThumbanilGenerator from '../src/index.js';

describe('ThumbanilGenerator:', function() {

    describe('Thumbnail Generation by percent', function() {
        it('can generate a single thumbnail without any options', function(done) {
            const tg = new ThumbanilGenerator({
              sourcePath: '/foo/bar.mp4',
              thumbnailPath: '~/'
            });

            sinon.stub(tg, 'generate').callsFake((opts) => {
                return Promise.resolve(['generate-thumbnail.png']);
            });

            tg.generateOneByPercent(90)
                .then(function(result) {
                    done();
                });
        });

        it('throws an error if generating a single thumbnail with a percent over 100', function(done) {
            const tg = new ThumbanilGenerator({
              sourcePath: '/foo/bar.mp4',
              thumbnailPath: '~/'
            });

            sinon.stub(tg, 'generate').callsFake((opts) => {
                return Promise.resolve(['generate-thumbnail.png']);
            });

            tg.generateOneByPercent(101)
                .catch(function(err) {
                    expect(err.message).to.equal('Percent must be a value from 0-100');
                    done();
                });
        });

        it('throws an error if generating a single thumbnail with a percent under 0', function(done) {
            const tg = new ThumbanilGenerator({
              sourcePath: '/foo/bar.mp4',
              thumbnailPath: '~/'
            });

            sinon.stub(tg, 'generate').callsFake((opts) => {
                return Promise.resolve(['generate-thumbnail.png']);
            });

            tg.generateOneByPercent(-1)
                .catch(function(err) {
                    expect(err.message).to.equal('Percent must be a value from 0-100');
                    done();
                });
        });
    });

});