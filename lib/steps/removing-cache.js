'use strict';

const fs = require ( 'fs-extra' );

module.exports = data => {
  const spin = data.opts.spin;

  if ( spin ) {
    spin.text = 'Remove cache';
    spin.start ();
  }

  return Promise.resolve ()
    .then ( () => fs.remove ( data.opts.cacheDir ) )
    .then ( () => {
      if ( spin ) {
        spin.text = `Cache «${data.opts.cacheDir}» was removed`;
        spin.succeed ();
      }

      return data;
    } );
};
