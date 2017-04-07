'use strict';

const which = require ( 'which' );
const exec = require ( '../../promisify/exec' );

module.exports = checksData => {
  const info = {
    name    : 'java',
    version : null,
    pass    : false,
    message : 'not found'
  };

  return Promise.resolve ()
    .then ( () => {
      return new Promise ( ( resolve, reject ) => {
        which ( 'java', err => {
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

      return exec ( `java -version`, {}, 'stderr' )
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
