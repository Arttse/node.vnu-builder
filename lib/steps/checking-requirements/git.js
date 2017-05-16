'use strict';

const which = require ( 'which' );
const exec = require ( '../../helpers/exec' );

module.exports = checksData => {
  const info = {
    name    : 'git',
    version : null,
    pass    : false,
    message : 'not found. Install this program or check your PATH environment variable.'
  };

  return Promise.resolve ()
    .then ( () => {
      return new Promise ( ( resolve, reject ) => {
        which ( 'git', err => {
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

      return exec ( 'git --version', {} )
        .then ( d => {
          info.version = d.match ( /\d+\.\d+\.\d+/ )[0];
        } );

    } )
    .then ( () => {
      checksData.push ( info );

      return checksData;
    } );
};
