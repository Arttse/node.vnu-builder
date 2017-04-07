'use strict';

const fs = require ( 'fs-extra' );

/**
 * Promise Wrapper for remove files or dirs.
 *
 * @param dir
 * @returns {Promise}
 */
module.exports = dir => {
  return new Promise ( ( resolve, reject ) => {
    fs.remove ( dir, err => {
      if ( err ) {
        reject ( err );
      }
      resolve ();
    } );
  } );
};
