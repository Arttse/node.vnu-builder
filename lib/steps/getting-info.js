'use strict';
const getCommitInfo = require ( '../helpers/get-commit-info' );
const getVnuVersion = require ( '../helpers/get-vnu-version' );

module.exports = data => {
  const spin = data.opts.spin;

  if ( spin ) {
    spin.text = 'Getting info from Github';
    spin.start ();
  }

  return Promise.resolve ()
    .then ( () => getCommitInfo ( data.opts ) )
    .then ( commitInfo => {
      data.commitInfo = commitInfo;
      data.vnuVersion = getVnuVersion ( commitInfo.committer.date );

      if ( spin ) {
        spin.text = `Info received. Commit «${commitInfo.sha}» from date «${commitInfo.committer.date}»`;
        spin.succeed ();
      }

      return data;
    } );
};
