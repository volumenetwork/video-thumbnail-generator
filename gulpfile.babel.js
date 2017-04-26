import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import mocha from 'gulp-mocha';
import eslint from 'gulp-eslint';
import babel from 'gulp-babel';
import plumber from 'gulp-plumber';
import istanbul from 'gulp-babel-istanbul';
import util from 'gulp-util';
import del from 'del';
import Instrumenter from 'isparta';
import runSequence from 'run-sequence';

const paths = {
  sourceFiles: ['src/**/*.js'],
  tests: ['test/**/*.js'],
  buildDir: 'build',
};

paths.buildFiles = [`${paths.buildDir}/**/*.js`];

/**
 * Task to remove assets from last build
 */
gulp.task('clean', (done) => {
  del(['build', 'coverage'], done);
});

/**
 * Task to lint the src files
 */
gulp.task('lint', () => (
  gulp.src(paths.sourceFiles)
    .pipe(eslint())
    .pipe(eslint.failOnError())
));

/**
 * Task to run the build
 */
gulp.task('build', () => (
  gulp.src(paths.sourceFiles)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['babel-preset-es2015'],
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.buildDir))
    .on('error', util.log)
));

/**
 * Task to hook anything required before the tests (basically just here for istanbul)
 */
gulp.task('coverage:instrument', () => (
  gulp.src(paths.sourceFiles)
    .pipe(istanbul({
      instrumenter: Instrumenter,
      includeUntested: true,
      exclude: ['src/migrations/**/*.js'],
    }))
    .pipe(istanbul.hookRequire())
));

/**
 * Task to conduct the requred tests
 */
gulp.task('test', () => (
  gulp.src(paths.tests, { read: false })
    .pipe(mocha({
      bail: true,
      require: 'babel-register',
      reporter: 'list',
    }))
    .on('error', util.log)
));

gulp.task('coverage:report', () => (
  gulp.src(paths.sourceFiles, { read: false })
    .pipe(istanbul.writeReports({
      dir: './coverage',
      reporters: [
        'lcov',
        'json',
        'text',
        'text-summary',
      ],
      reportOpts: {
        dir: './coverage',
      },
    }))
    .pipe(istanbul.enforceThresholds({ thresholds: { global: 10 } }))
    .on('error', util.log)
));

gulp.task('test:coverage', done => (
  runSequence('coverage:instrument', 'test', 'coverage:report', done)
));

/**
 * Task to watch the files whilst developing
 */
gulp.task('watch', () => (
  gulp.watch(paths.sourceFiles, ['build'])
));


gulp.task('prebuild', ['clean', 'lint', 'test:coverage']);
gulp.task('default', ['prebuild', 'build']);
gulp.task('prepublish', ['default']);
