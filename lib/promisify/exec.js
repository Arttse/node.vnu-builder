'use strict';

const childProcess = require ( 'child_process' );

/**
 * Promise wrapper for child_process.exec
 *
 * @param {String} command - The command to run, with space-separated arguments
 * @param {Object} options - child_process exec
 * @returns {Promise}
 */
module.exports = ( command, options ) => {
  options = options || {};

  return new Promise ( ( resolve, reject ) => {
    childProcess.exec ( command, options, ( error, stdout, stderr ) => {
      if ( error ) {
        const errors = {
          error,
          stderr
        };
        reject ( errors );
      }
      resolve ( stdout );
    } );
  } );
};
