# Video Thumbnail Generator

[![Build Status](https://travis-ci.org/volumenetwork/video-thumbnail-generator.svg?branch=master)](https://travis-ci.org/volumenetwork/video-thumbnail-generator)
![david-dm](https://david-dm.org/volumenetwork/video-thumbnail-generator.svg)

## Quick Start

```js
import ThumbnailGenerator from 'video-thumbnail-generator';
// const ThumbnailGenerator = require('video-thumbnail-generator').default;

const tg = new ThumbnailGenerator({
  sourcePath: '/tmp/test.mp4',
  thumbnailPath: '/tmp/',
  tmpDir: '/some/writeable/directory' //only required if you can't write to /tmp/ and you need to generate gifs
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
 
tg.generateCb((err, result) => {
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

tg.generateGif()
  .then(console.log();
  // '/full/path/to/video-1493133602092.gif'

tg.generateGifCb((err, result) => {
  console.log(result);
  // '/full/path/to/video-1493133602092.gif'
})
```

## Options

There are options that can be passed when generating thumbnails. Both `ThumbnailGenerate.generate(opts)` and `ThumbnailGenerate.generateOneByPercent(number, opts)` can take options. See example below to get screenshots at a resolution of 200x200:

### When generating screenshots/thumbnails

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


tg.generateCb({
  size: '200x200'
}, (err, result) => {
  console.log(result);
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
});
```
The `opts` above can take anything that options in [fluent-ffmpeg's Screenshots allow](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg#screenshotsoptions-dirname-generate-thumbnails)


### When generating gifs
```js
tg.generateGif({
   fps: 0.75, //how many frames per second you want in your gif
   scale: 180, //the smaller the number, the smaller the thumbnail
   speedMultiple: 4, //this is 4x speed
   deletePalette: true //to delete the palettefile that was generated to create the gif once gif is created 
});
```

## Tests

`./node_modules/.bin/gulp test`

Else, if you want to run with a code coverage report:
`./node_modules/.bin/gulp test:coverage`