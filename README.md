# Video Thumbnail Generator

[![Build Status](https://travis-ci.org/volumenetwork/video-thumbnail-generator.svg?branch=master)](https://travis-ci.org/volumenetwork/video-thumbnail-generator)

## Quick Start

```js
import ThumbnailGenerator from 'volume-thumbnail-generator';
// const ThumbnailGenerator = require('volume-thumbnail-generator').default;

const tg = new ThumbnailGenerator({
  sourcePath: '/tmp/test.mp4',
  thumbnailPath: '/tmp/',
});

tg.generate()
  .then(console.log);
  // [ 'test-thumbnail-320x240-0001.png',
  //  'test-thumbnail-320x240-0002.png',
  //  'test-thumbnail-320x240-0003.png',
  //  'test-thumbnail-320x240-0004.png',
  //  'test-thumbnail-320x240-0005.png',
  //  'test-thumbnail-320x240-0006.png',
  //  'test-thumbnail-320x240-0007.png',
  //  'test-thumbnail-320x240-0008.png',
  //  'test-thumbnail-320x240-0009.png',
  //  'test-thumbnail-320x240-0010.png' ]  

tg.generateOneByPercent(90)
  .then(console.log);
  // 'test-thumbnail-320x240-0001.png'
 
tg.generateCb({}, (err, result) => {
  console.log(result);
  // [ 'test-thumbnail-320x240-0001.png',
  //  'test-thumbnail-320x240-0002.png',
  //  'test-thumbnail-320x240-0003.png',
  //  'test-thumbnail-320x240-0004.png',
  //  'test-thumbnail-320x240-0005.png',
  //  'test-thumbnail-320x240-0006.png',
  //  'test-thumbnail-320x240-0007.png',
  //  'test-thumbnail-320x240-0008.png',
  //  'test-thumbnail-320x240-0009.png',
  //  'test-thumbnail-320x240-0010.png' ]  
});

tg.generateOneByPercentCb(90, (err, result) => {
  console.log(result);
  // 'test-thumbnail-320x240-0001.png'
});
```

## Options

There are options that can be passed when generating thumbnails. Both `ThumbnailGenerate.generate(opts)` and `ThumbnailGenerate.generateOneByPercent(number, opts)` can take options. See example below to get screenshots at a resolution of 200x200:

```js
tg.generate({
  size: '200x200'
})
  .then(console.log);
  // [ 'test-thumbnail-200x200-0001.png',
  //  'test-thumbnail-200x200-0002.png',
  //  'test-thumbnail-200x200-0003.png',
  //  'test-thumbnail-200x200-0004.png',
  //  'test-thumbnail-200x200-0005.png',
  //  'test-thumbnail-200x200-0006.png',
  //  'test-thumbnail-200x200-0007.png',
  //  'test-thumbnail-200x200-0008.png',
  //  'test-thumbnail-200x200-0009.png',
  //  'test-thumbnail-200x200-0010.png' ]  
```