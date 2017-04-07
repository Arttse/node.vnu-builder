'use strict';

const emptyDir = require ( '../promisify/empty-dir' );

module.exports = data => {
  const spin = data.opts.spin;

  if ( spin ) {
    spin.text = `Cleaning directory cache «${data.opts.cacheDir}»`;
    spin.start ();
  }

  return emptyDir ( data.opts.cacheDir )
    .then ( () => {
      if ( spin ) {
        spin.stop ();
      }

      return data;
    } );
};
