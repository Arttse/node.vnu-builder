'use strict';

/** Modules */
const fsPromise = require ( './lib/fs-promise' );
const configOpts = require ( './lib/config-opts' );
const exec = require ( './lib/exec' );
const getCommitInfo = require ( './lib/get-commit-info' );
const getVnuVersion = require ( './lib/get-vnu-version' );


/**
 * Build Validator NU «jar» or «war» files
 *
 * @param opts
 * @returns {Promise|Object} - data
 */
module.exports = opts => {

  const data = {};
  let spin;

  return Promise.resolve ()

  /** Configure options */
    .then ( () => {
      return configOpts ( opts )
    } )
    .then ( opts => data.opts = opts )

    /** Set spin if exists */
    .then ( () => {
      if ( data.opts.spin ) {
        if ( data.opts.spin.constructor.name === 'Ora' ) {
          spin = data.opts.spin;
          delete data.opts.spin;
          spin.start ();
        }
      }
    } )

    /** Get info about commit from Github repository */
    .then ( () => {

      if ( spin ) {
        spin.text = 'Get info about commit from Github repository';
      }

      return getCommitInfo ( data.opts );

    } )
    .then ( commitInfo => {

      data.commitInfo = commitInfo;
      data.vnuVersion = getVnuVersion ( commitInfo.committer.date );

      if ( spin ) {
        spin.text = `Info received. Commit «${commitInfo.sha}» from date «${commitInfo.committer.date}»`;
        spin.succeed ().start ();
      }

    } )

    /** Create or clear cache */
    .then ( () => {

      if ( spin ) {
        spin.text = 'Create or clear cache';
      }

      return fsPromise.emptyDir ( data.opts.cacheDir );

    } )
    .then ( () => {
      if ( spin ) {
        spin.text = `Cache dir «${data.opts.cacheDir}» was created`;
        spin.succeed ().start ();
      }
    } )

    /** Clone project to cache dir */
    .then ( () => {

      if ( spin ) {
        spin.text = `Clone project to «${data.opts.cacheDir}»`;
      }

      return exec ( `git clone -q https://github.com/${data.opts.repoAuthor}/${data.opts.repoName}.git ${data.opts.cacheDir}` )
        .then ( d => {

          if ( data.opts.commitGet !== 'last' ) {

            return exec ( `git checkout -q ${data.opts.commitGet}`, {cwd : data.opts.cacheDir} );

          }

          return d;

        } );

    } )
    .then ( () => {
      if ( spin ) {
        spin.text = `Repository «${data.opts.repoAuthor}/${data.opts.repoName}» was cloned`;
        spin.succeed ().start ();
      }
    } )

    /** Patch build.py validator version */
    .then ( () => {

      if ( spin ) {
        spin.text = `Patch «${data.opts.buildFile}» validator version`;
      }

      return fsPromise.stat ( data.opts.buildFile )
        .then ( () => {

          return fsPromise.readFile ( data.opts.buildFile, {encoding : 'utf8'} );

        } )
        .then ( fileData => {

          fileData = fileData.replace ( /validatorVersion\s=.+/g, `validatorVersion = "${data.vnuVersion}"` );

          return fsPromise.writeFile ( data.opts.buildFile, fileData, {encoding : 'utf8'} );

        } );

    } )
    .then ( () => {
      if ( spin ) {
        spin.text = `File «${data.opts.buildFile}» successfully patched`;
        spin.succeed ().start ();
      }
    } )

    /** Build using Python */
    .then ( () => {

      if ( spin ) {
        spin.text = 'Build using Python';
      }

      const relativeBuildDir = data.opts.buildFile.replace ( data.opts.cacheDir, '.' );

      return new Promise ( ( resolve, reject ) => {

        const spawn = require ( 'child_process' ).spawn;
        const build = spawn ( relativeBuildDir, data.opts.buildArguments.concat ( data.opts.outputFileType ), {cwd : data.opts.cacheDir} );

        build.stdout.on ( 'data', d => {
          if ( data.opts.buildLog ) {
            console.log ( d.toString ().trim () );
          }
        } );

        build.stderr.on ( 'data', d => {
          if ( data.opts.buildLog ) {
            console.log ( d.toString ().trim () );
          }
        } );

        build.on ( 'close', code => {

          if ( code > 0 ) {

            reject ( new Error ( `Build exited with code ${code}. Run build with «{buildLog:true}» option for more details.` ) );

          } else {

            resolve ();

          }

        } );

      } );

    } )
    .then ( () => {
      if ( spin ) {
        spin.text = `Successfully built «vnu.${data.opts.outputFileType}» with version «${data.vnuVersion}»`;
        spin.succeed ().start ();
      }
    } )

    /** Copy built file to output dir */
    .then ( () => {

      if ( spin ) {
        spin.text = 'Copy built file to output dir';
      }

      return fsPromise.copy (
        `${data.opts.distDir}/vnu.${data.opts.outputFileType}`,
        `${data.opts.outputDir}/vnu.${data.opts.outputFileType}`,
        {
          clobber : true
        }
      );

    } )
    .then ( () => {
      if ( spin ) {
        spin.text = `File «vnu.${data.opts.outputFileType}» has been successfully copied to «${data.opts.outputDir}»`;
        spin.succeed ().start ();
      }
    } )

    /** Remove cache */
    .then ( () => {

      if ( spin ) {
        spin.text = 'Remove cache';
      }

      return fsPromise.remove ( data.opts.cacheDir );

    } )
    .then ( () => {
      if ( spin ) {
        spin.text = `Cache «${data.opts.cacheDir}» was removed`;
        spin.succeed ();
      }
    } )

    /** Return data */
    .then ( () => data );

};
