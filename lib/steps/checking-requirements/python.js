'use strict';

const which = require ( 'which' );
const exec = require ( '../../promisify/exec' );

module.exports = checksData => {
  const info = {
    name    : 'python',
    version : null,
    pass    : false,
    message : 'not found'
  };

  return Promise.resolve ()
    .then ( () => {
      return new Promise ( ( resolve, reject ) => {
        which ( 'python', err => {
          if ( err ) {
            if ( /not\sfound/i.test ( err.message ) ) {
              resolve ();
            } else {
              reject ( err );
            }
          } else {
            info.pass = true;
            info.message = 'found';

            resolve ();
          }
        } );
      } );
    } )
    .then ( () => {
      if ( !info.pass ) {
        return;
      }

      return exec ( 'python --version', {}, 'alt' )
        .then ( d => {
          info.version = d.match ( /\d+\.\d+\.\d+/ )[0];
        } );

    } )
    .then ( () => {

    } )
    .then ( () => {
      checksData.push ( info );

      return checksData;
    } );
};
