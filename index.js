'use strict';

/**
 * Build Validator NU «jar» or «war» files
 *
 * @param opts
 * @returns {Promise|Object} - data
 */
module.exports = opts => {
  let chain = Promise.resolve ( opts );

  /** Configuring an options */
  chain = chain.then ( require ( './lib/steps/configuring-options' ) );

  /** Checking requirements */
  chain = chain.then ( require ( './lib/steps/checking-requirements' ) );

  /** Getting info from Github */
  chain = chain.then ( require ( './lib/steps/getting-info' ) );

  /** Cleaning directory cache */
  chain = chain.then ( require ( './lib/steps/cleaning-cache' ) );

  /** Cloning to cache dir */
  chain = chain.then ( require ( './lib/steps/cloning' ) );

  /** Patching version of the validator */
  chain = chain.then ( require ( './lib/steps/patching-version' ) );

  /** Building */
  chain = chain.then ( require ( './lib/steps/building' ) );

  /** Coping built file to output dir */
  chain = chain.then ( require ( './lib/steps/coping-built-file' ) );

  /** Removing cache */
  chain = chain.then ( require ( './lib/steps/removing-cache' ) );

  return chain;
};
