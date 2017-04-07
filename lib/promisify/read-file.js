'use strict';

const fs = require ( 'fs' );

/**
 * Promise Wrapper.
 * Asynchronously reads the entire contents of a file
 *
 * @param file
 * @param options
 * @returns {Promise}
 */
module.exports = ( file, options ) => {
  options = options || {};

  return new Promise ( ( resolve, reject ) => {
    fs.readFile ( file, options, ( err, data ) => {
      if ( err ) {
        reject ( err );
      }
      resolve ( data );
    } );
  } );
};
