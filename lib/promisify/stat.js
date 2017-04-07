'use strict';

const fs = require ( 'fs' );

/**
 * Promise Wrapper.
 * Get file status
 *
 * @param file
 * @returns {Promise}
 */
module.exports = file => {
  return new Promise ( ( resolve, reject ) => {
    fs.stat ( file, ( err, stat ) => {
      if ( err ) {
        reject ( err );
      }
      resolve ( stat );
    } );
  } );
};
