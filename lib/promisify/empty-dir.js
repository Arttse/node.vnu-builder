'use strict';

const fs = require ( 'fs-extra' );

/**
 * Promise Wrapper.
 * Ensures that a directory is empty.
 * Deletes directory contents if the directory is not empty.
 * If the directory does not exist, it is created.
 * The directory itself is not deleted.
 *
 * @param dir
 * @returns {Promise}
 */
module.exports = dir => {
  return new Promise ( ( resolve, reject ) => {
    fs.emptyDir ( dir, err => {
      if ( err ) {
        reject ( err );
      }
      resolve ();
    } );
  } );
};
