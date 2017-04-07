'use strict';

const fs = require ( 'fs' );

/**
 * Promise Wrapper.
 * Asynchronously writes data to a file, replacing the file if it already exists.
 *
 * @param file
 * @param data
 * @param options
 * @returns {Promise}
 */
module.exports = ( file, data, options ) => {
  options = options || {};

  return new Promise ( ( resolve, reject ) => {
    fs.writeFile ( file, data, options, err => {
      if ( err ) {
        reject ( err );
      }
      resolve ();
    } );
  } );
};
