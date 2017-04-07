'use strict';

const fsPromise = require ( '../helpers/fs-promise' );

module.exports = data => {
  const spin = data.opts.spin;

  if ( spin ) {
    spin.text = 'Coping built file to output dir';
    spin.start ();
  }

  return Promise.resolve ()
    .then ( () => fsPromise.copy (
      `${data.opts.distDir}/vnu.${data.opts.outputFileType}`,
      `${data.opts.outputDir}/vnu.${data.opts.outputFileType}`,
      {clobber : true}
      )
    )
    .then ( () => {
      if ( spin ) {
        spin.text = `File «vnu.${data.opts.outputFileType}» has been successfully copied to «${data.opts.outputDir}»`;
        spin.succeed ();
      }

      return data;
    } );
};
