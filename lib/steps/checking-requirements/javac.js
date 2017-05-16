'use strict';

const which = require ( 'which' );
const exec = require ( '../../helpers/exec' );

module.exports = checksData => {
  const info = {
    name    : 'javac',
    version : null,
    pass    : false,
    message : 'not found. Install this program or check your PATH environment variable.'
  };

  return Promise.resolve ()
    .then ( () => {
      return new Promise ( ( resolve, reject ) => {
        which ( 'javac', err => {
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

      return exec ( `javac -version`, {}, 'stderr' )
        .then ( d => {
          info.version = d.match ( /\d+\.(\d+\.\d+)/ )[1];
        } );

    } )
    .then ( () => {
      if ( parseFloat ( info.version ) < 8 ) {
        info.pass = false;
        info.message = `version is ${info.version}, please update to version 8.0 or newer`;
      }
    } )
    .then ( () => {
      checksData.push ( info );

      return checksData;
    } );
};
