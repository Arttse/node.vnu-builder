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

    if ( !isPlainObject ( opts ) ) {

      reject ( new TypeError ( 'Options must be an plain object' ) );

    }

    const firstOpts = {
      cacheDir       : './.cache-vnu-builder',
      commitGet      : 'last',
      outputDir      : './',
      outputFileType : 'jar',
      repoAuthor     : 'validator',
      repoName       : 'validator',
      buildArguments    : [
        'update',
        'dldeps',
        'build',
        'test'
      ]
    };

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


    resolve ( opts );

  } );

};
