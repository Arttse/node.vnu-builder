'use strict';

/** Modules */
const isPlainObject = require ( 'is-plain-object' );


/**
 * Configure options
 *
 * @param {Object} opts - options
 * @returns {Promise}
 */
module.exports = opts => {

  return new Promise ( ( resolve, reject ) => {

    if ( typeof opts !== 'undefined' && !isPlainObject ( opts ) ) {

      reject ( new TypeError ( 'Options must be a plain object' ) );

    }

    let firstOpts = {
      cacheDir          : './.cache-vnu-builder',
      commitGet         : 'last',
      outputDir         : './',
      outputFileType    : 'jar',
      repoAuthor        : 'validator',
      repoName          : 'validator',
      buildingShowLog   : false,
      buildingArguments : [
        'update',
        'dldeps',
        'build',
        'test'
      ]
    };

    firstOpts = Object.assign ( firstOpts, opts );

    const secondOpts = {
      buildFile : `${firstOpts.cacheDir}/build/build.py`,
      distDir   : `${firstOpts.cacheDir}/build/dist`
    };

    opts = Object.assign ( firstOpts, secondOpts, opts );


    if ( opts.commitGet !== 'last' && ( opts.commitGet.length < 40 || opts.commitGet.length > 40 ) ) {

      reject ( new RangeError ( 'Option «commitGet» needs 40-character checksum commit hash' ) );

    }

    if ( !/^(jar|war)$/i.test ( opts.outputFileType ) ) {

      reject ( new Error ( 'Option «outputFileType» value can be «jar» or «war»' ) );

    }

    if ( opts.spin ) {
      if ( opts.spin.constructor.name !== 'Ora' ) {
        reject ( new Error ( 'Option «spin». Sorry! It working only with «ora» module' ) );
      }
    }


    resolve ( opts );

  } );

};
