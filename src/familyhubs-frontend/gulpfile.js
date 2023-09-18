"use strict";

const gulp = require("gulp"),
    rename = require('gulp-rename'),
    fs = require('fs');

//todo: not working for the local reference (for now need to manually run gulp copy-familyhubs-frontend-js from node_modules/familyhubs-frontend)
// return true if being installed from NPM, false if being run from the local repo (using file:)
function remotelyInstalled() {
    return process.cwd().endsWith('node_modules\familyhubs-frontend');
}

function getWwwRootDir() {
    //console.log(process.cwd());
    //console.log(remotelyInstalled());
    let baseDir = remotelyInstalled() ? '../..' : '../..';

    // Check if this is a NPM link situation
    //if (process.env.npm_lifecycle_event === 'link') {}

    return baseDir + '/wwwroot';
}

gulp.task('copy-wwwroot', function () {
    let baseDir = getWwwRootDir();
    return gulp.src('wwwroot/**/*')
        .pipe(gulp.dest(baseDir));
});

function copyPackageJsToWwwroot(packageName, srcFilename) {
    // Read the package.json file to get the package version
    const packageJson = JSON.parse(fs.readFileSync(`../${packageName}/package.json`));
    const packageVersion = packageJson.version;

    // Set the destination file name
    const destFileName = `${packageName}-${packageVersion}.min.js`;

    let baseDir = getWwwRootDir();

    //console.log(process.cwd());
    //console.log(baseDir);
    // Copy and rename the file
    return gulp.src(`../${packageName}/${srcFilename}`)
        .pipe(rename(destFileName))
        .pipe(gulp.dest(baseDir + '/js'));
}

gulp.task('copy-govuk-frontend-js', function () {
    return copyPackageJsToWwwroot('govuk-frontend', 'govuk/all.js');
});

gulp.task('copy-familyhubs-frontend-js', function () {
    return copyPackageJsToWwwroot('familyhubs-frontend', 'all.min.js');
});

gulp.task('populate-wwwroot', gulp.series('copy-wwwroot'));

//todo: delegate from consumer gulp to this gulp?