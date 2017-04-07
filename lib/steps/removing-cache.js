'use strict';

const remove = require ( '../promisify/remove' );

module.exports = data => {
  const spin = data.opts.spin;

  if ( spin ) {
    spin.text = 'Remove cache';
    spin.start ();
  }

  return Promise.resolve ()
    .then ( () => remove ( data.opts.cacheDir ) )
    .then ( () => {
      if ( spin ) {
        spin.text = `Cache «${data.opts.cacheDir}» was removed`;
        spin.succeed ();
      }

      return data;
    } );
};
