'use strict';

const exec = require ( '../helpers/exec' );

module.exports = data => {
  const spin = data.opts.spin;

  if ( spin ) {
    spin.text = `Cloning «${data.opts.repoAuthor}/${data.opts.repoName}» to «${data.opts.cacheDir}»`;
    spin.start ();
  }

  return Promise.resolve ()
    .then ( () => {
      return exec ( `git clone -q https://github.com/${data.opts.repoAuthor}/${data.opts.repoName}.git ${data.opts.cacheDir}`, {} )
        .then ( d => {
          if ( data.opts.commitGet !== 'last' ) {
            return exec ( `git checkout -q ${data.opts.commitGet}`, {cwd : data.opts.cacheDir} );
          }

          return d;
        } );
    } )
    .then ( () => {
      if ( spin ) {
        spin.text = `Repository «${data.opts.repoAuthor}/${data.opts.repoName}» from Github was cloned`;
        spin.succeed ();
      }

      return data;
    } )
};
