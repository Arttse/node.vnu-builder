'use strict';

const stat = require ( '../promisify/stat' );
const readFile = require ( '../promisify/read-file' );
const writeFile = require ( '../promisify/write-file' );

module.exports = data => {
  const spin = data.opts.spin;

  if ( spin ) {
    spin.text = 'Patching version of the validator';
    spin.start ();
  }

  return Promise.resolve ()
    .then ( () => {
      return stat ( data.opts.buildFile )
        .then ( () => readFile ( data.opts.buildFile, {encoding : 'utf8'} ) )
        .then ( fileData => {
          fileData = fileData.replace ( /validatorVersion\s=.+/g, `validatorVersion = "${data.vnuVersion}"` );

          return writeFile ( data.opts.buildFile, fileData, {encoding : 'utf8'} );
        } );

    } )
    .then ( () => {
      if ( spin ) {
        spin.text = 'Version of the validator successfully patched';
        spin.stop ();
      }

      return data;
    } );
};
