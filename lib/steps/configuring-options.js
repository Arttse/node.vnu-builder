'use strict';

module.exports = opts => {
  const data = {};

  return Promise.resolve ( require ( '../helpers/configure-options' ) ( opts ) )
    .then ( newOpts => {
      data.opts = newOpts;

      return data;
    } );
};
