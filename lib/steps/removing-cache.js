'use strict';

const fsPromise = require ( '../helpers/fs-promise' );

module.exports = data => {
  const spin = data.opts.spin;

  if ( spin ) {
    spin.text = 'Remove cache';
    spin.start ();
  }

  return Promise.resolve ()
    .then ( () => fsPromise.remove ( data.opts.cacheDir ) )
    .then ( () => {
      if ( spin ) {
        spin.text = `Cache «${data.opts.cacheDir}» was removed`;
        spin.succeed ();
      }

      return data;
    } );
};
