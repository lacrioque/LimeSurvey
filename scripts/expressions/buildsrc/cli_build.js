/****************************************************
This file requires a working node.js and gulp environment.
If you are not familiar with gulp, please refer to their documentation
****************************************************/
var gulp = require('gulp'),
    fs = require('fs'),
    cnct = require('gulp-concat'),
    head = require('gulp-header'),
    uglify = require('gulp-uglify'),
    async = require('async'),
    runSequence = require('run-sequence'),
    pump = require('pump'),
    babel = require('gulp-babel');

//Basic Task just build everything
gulp.task('build', [runSequence(['build.modules','build.selectors','build.parsers']),'createExpression']);
//Basic Task just build everything to debug mode
gulp.task('build.debug', [runSequence(['build.modules','build.selectors','build.parsers']),'createExpressionDebug']);

//Create modules.js file from all modules
gulp.task('build.modules', function(end){
    pump([
        gulp.src("./modules/*.js"),
        cnct('modules.js'),
        babel({presets: ['es2015']}),
        head("/***PLEASE DO NOT MODIFY THIS FILES DIRECTLY IT WILL BE OVERWRITTEN AFTER ANY UPDATE***/"),
        gulp.dest('./')
    ],end);
});

//Create selectors.js file from all selectors
gulp.task('build.selectors', function(end){
    pump([
        gulp.src("./selectors/*.js"),
        cnct('selectors.js'),
        babel({presets: ['es2015']}),
        head("/***PLEASE DO NOT MODIFY THIS FILES DIRECTLY IT WILL BE OVERWRITTEN AFTER ANY UPDATE***/"),
        gulp.dest('./')
    ],end);
});

//Create parsers.js file from all parsers
gulp.task('build.parsers', function(end){
    pump([
        gulp.src("./parsers/*.js"),
        cnct('parsers.js'),
        babel({presets: ['es2015']}),
        head("/***PLEASE DO NOT MODIFY THIS FILES DIRECTLY IT WILL BE OVERWRITTEN AFTER ANY UPDATE***/"),
        gulp.dest('./')
    ],end);
});

//Create ExpressionManager file
gulp.task('createExpression', function(end){
    pump([
        gulp.src([
            'modules.js',
            'parsers.js',
            'selectors.js'
        ]),
        cnct('em_javascript.js'),
        uglify(),
        head("/***PLEASE DO NOT MODIFY THIS FILES DIRECTLY IT WILL BE OVERWRITTEN AFTER ANY UPDATE***/"),
        gulp.dest('../')
    ],end);
});

//Create ExpressionManager file, for debugging
gulp.task('createExpressionDebug', function(end){
    pump([
        gulp.src([
            'modules.js',
            'parsers.js',
            'selectors.js'
        ]),
        cnct('em_javascript.js'),
        gulp.dest('../')
    ],end);
});
