'use strict';

const fs = require ( 'fs-extra' );

/**
 * Promise wrapper for copy files or dirs.
 *
 * @param from
 * @param to
 * @returns {Promise}
 */
module.exports = ( from, to ) => {
  return new Promise ( ( resolve, reject ) => {
    fs.copy ( from, to, err => {
      if ( err ) {
        reject ( err );
      }
      resolve ();
    } );
  } );
};
