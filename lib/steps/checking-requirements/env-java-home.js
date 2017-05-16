'use strict';

const fs = require ( 'fs' );

module.exports = checksData => {
  const info = {
    name    : 'JAVA_HOME',
    version : null,
    pass    : false,
    message : 'is empty. Set the JAVA_HOME environment variable'
  };

  return Promise.resolve ()
    .then ( () => {
      if ( process.env.JAVA_HOME ) {
        info.pass = true;
        info.message = `is ${process.env.JAVA_HOME}`;
      }
    } )
    .then ( () => {
      if ( info.pass ) {
        return new Promise ( resolve => {
          fs.stat ( process.env.JAVA_HOME, err => {
            if ( err ) {
              if ( err.code === 'ENOENT' ) {
                info.pass = false;
                info.message = `is specified, but really no such directory ${process.env.JAVA_HOME}`;
                resolve ();
              }
            }
            resolve ();
          } );
        } );
      }
    } )
    .then ( () => {

      checksData.push ( info );

      return checksData;
    } );
};
