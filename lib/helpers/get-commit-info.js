'use strict';

/** Modules */
const got = require ( 'got' );


/**
 * Get commit info
 *
 * @param {Object} opts
 * @returns {Promise}
 */
module.exports = opts => {

  const gotOpts = {
    headers : {
      'user-agent' : opts.userAgent
    }
  };

  let url;

  if ( opts.commitGet === 'last' ) {

    url = `https://api.github.com/repos/${opts.repoAuthor}/${opts.repoName}/git/refs/heads/master`;

  } else {

    url = `https://api.github.com/repos/${opts.repoAuthor}/${opts.repoName}/git/commits/${opts.commitGet}`;

  }


  return got ( url, gotOpts )
    .then ( response => {

      const commitInfo = JSON.parse ( response.body );

      if ( opts.commitGet === 'last' ) {

        return got ( commitInfo.object.url, gotOpts ).then ( response => {

          return JSON.parse ( response.body );

        } );

      }

      return commitInfo;

    } );

};
