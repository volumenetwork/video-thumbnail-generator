import FfmpegCommand from 'fluent-ffmpeg';
import Promise from 'bluebird';
import _ from 'lodash';

/**
 * @class ThumbnailGenerator
 */
export default class ThumbnailGenerator {
  /**
   * @constructor
   *
   * @param {String} [opts.sourcePath] - 'full path to video file'
   * @param {String} [opts.thumbnailPath] - 'path to where thumbnail(s) should be saved'
   * @param {Number} [opts.percent]
   * @param {String} [opts.size]
   * @param {Logger} [opts.logger]
   */
  constructor(opts) {
    this.sourcePath = opts.sourcePath;
    this.thumbnailPath = opts.thumbnailPath;
    this.percent = `${opts.percent}%` || '90%';
    this.logger = opts.logger || null;
    this.size = opts.size || '320x240';
    this.fileNameFormat = '%b-thumbnail-%r-%000i';
  }

  /**
   * @method getFfmpegInstance
   *
   * @return {FfmpegCommand}
   *
   * @private
   */
  getFfmpegInstance() {
    return new FfmpegCommand({
      source: this.sourcePath,
      logger: this.logger,
    });
  }

  /**
   * Method to generate one thumbnail by being given a percentage value.
   *
   * @method generateOneByPercent
   *
   * @param {Number} percent
   *
   * @return {Promise}
   *
   * @public
   *
   * @async
   */
  generateOneByPercent(percent) {
    if (percent < 0 || percent > 100) {
      throw new Error('Perect must be a value from 0-100');
    }

    return this.generate({
      count: 1,
      timestamps: [`${percent}%`],
    }).then(result => result.pop());
  }

  /**
   * Method to generate one thumbnail by being given a percentage value.
   *
   * @method generateOneByPercentCb
   *
   * @param {Number} percent
   * @param {Function} cb (err, string)
   *
   * @return {Void}
   *
   * @public
   *
   * @async
   */
  generateOneByPercentCb(percent, cb) {
    this.generateOneByPercent(percent)
      .then(result => cb(null, result))
      .catch(cb);
  }

  /**
   * Method to generate thumbnails
   *
   * @method generate
   *
   * @param {String} [opts.folder]
   * @param {Number} [opts.count]
   * @param {String} [opts.size] - 'i.e. 320x320'
   * @param {String} [opts.filename]
   *
   * @return {Promise}
   *
   * @public
   *
   * @async
   */
  generate(opts) {
    const defaultSettings = {
      folder: this.thumbnailPath,
      count: 10,
      size: this.size,
      filename: this.fileNameFormat,
    };

    const ffmpeg = this.getFfmpegInstance();
    const settings = _.assignIn(defaultSettings, opts);
    let filenameArray = [];

    return new Promise((resolve, reject) => {
      function complete() {
        resolve(filenameArray);
      }

      function filenames(fns) {
        filenameArray = fns;
      }

      ffmpeg
        .on('filenames', filenames)
        .on('end', complete)
        .on('error', reject)
        .screenshots(settings);
    });
  }

  /**
   * Method to generate thumbnails
   *
   * @method generateCb
   *
   * @param {String} [opts.folder]
   * @param {Number} [opts.count]
   * @param {String} [opts.size] - 'i.e. 320x320'
   * @param {String} [opts.filename]
   * @param {Function} cb - (err, array)
   *
   * @return {Void}
   *
   * @public
   *
   * @async
   */
  generateCb(opts, cb) {
    this.generate(opts)
      .then(result => cb(null, result))
      .catch(cb);
  }
}
