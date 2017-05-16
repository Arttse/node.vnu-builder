'use strict';

const fs = require ( 'fs-extra' );

module.exports = data => {
  const spin = data.opts.spin;

  if ( spin ) {
    spin.text = `Cleaning directory cache «${data.opts.cacheDir}»`;
    spin.start ();
  }

  return fs.emptyDir ( data.opts.cacheDir )
    .then ( () => {
      if ( spin ) {
        spin.stop ();
      }

      return data;
    } );
};
