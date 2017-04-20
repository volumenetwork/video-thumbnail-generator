# Video Thumbnail Generator

[![Build Status](https://travis-ci.org/volumenetwork/video-thumbnail-generator.svg?branch=master)](https://travis-ci.org/volumenetwork/video-thumbnail-generator)

## Quick Start

```
import ThumbnailGenerator from 'volume-thumbnail-generator';

var tg = new ThumbnailGenerator({
  sourcePath: '/path/to/my/file.mp4',
  thumbnailPath: '/var/tmp/screenshots/',
});

tg.generate()
  .then(function (filenames) {
    console.log(filenames);
  })
  .catch( err => {
    console.log(err);
  });
```