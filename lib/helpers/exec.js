'use strict';

const childProcess = require ( 'child_process' );

/**
 * Promise wrapper for child_process.exec
 *
 * @param {String} command - The command to run, with space-separated arguments
 * @param {Object} options - child_process exec
 * @param {String} output - output type: stdout, stderr, alt
 * @returns {Promise}
 */
module.exports = ( command, options, output ) => {
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
      if ( typeof output === 'string' ) {
        if ( output === 'stderr' ) {
          resolve ( stderr );
        } else if ( output === 'stdout' ) {
          resolve ( stdout );
        } else if ( output === 'alt' ) {
          if ( stderr && stdout.length === 0 ) {
            resolve ( stderr );
          } else {
            resolve ( stdout );
          }
        }
      } else {
        resolve ( stdout );
      }
    } );
  } );
};
