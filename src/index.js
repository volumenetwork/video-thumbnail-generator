import FfmpegCommand from 'fluent-ffmpeg';
import Promise from 'bluebird';

export default class ThumbnailGenerator {
  constructor(opts) {
    this.sourcePath = opts.sourcePath;
    this.thumbailPath = opts.thumbnailPath;
    this.percent = opts.percent || '90%';
    this.logger = opts.logger || null;
  }

  getFfmpegInstance() {
    return new FfmpegCommand({
      source: this.sourcePath,
      logger: this.logger,
    });
  }

  generate() {
    const ffmpeg = this.getFfmpegInstance();
    const tnPath = this.thumbailPath;
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
        .screenshots({
          folder: tnPath,
          count: 10,
        });
    });
  }
}
