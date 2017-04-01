'use strict';

const fsPromise = require ( '../helpers/fs-promise' );

module.exports = data => {
  const spin = data.opts.spin;

  if ( spin ) {
    spin.text = `Cleaning directory cache «${data.opts.cacheDir}»`;
    spin.start ();
  }

  return fsPromise.emptyDir ( data.opts.cacheDir )
    .then ( () => {
      if ( spin ) {
        spin.stop ();
      }

      return data;
    } );
};
