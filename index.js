'use strict';

/** Modules */
const fsPromise     = require ( './lib/fs-promise' );
const configOpts    = require ( './lib/config-opts' );
const exec          = require ( './lib/exec' );
const getCommitInfo = require ( './lib/get-commit-info' );
const getVnuVersion = require ( './lib/get-vnu-version' );
const showTime      = require ( './lib/show-time' );


/**
 * Build Validator NU «jar» or «war» files
 *
 * @param opts
 * @returns {Promise|Object} - data
 */
module.exports = opts => {

  console.time ( `Build Validator Nu file successfully` );

  const data = {};

  /** 1. Configure options */
  return configOpts ( opts )

  /** 2. Get info about commit from Github repository */
    .then ( opts => {

      console.log ( `[${showTime ()}] Status: Options configured...` );

      data.opts = opts;

      return getCommitInfo ( opts );

    } )

    /** 3. Create or clear cache */
    .then ( commitInfo => {

      console.log ( `[${showTime ()}] Status: Commit "${commitInfo.sha}" info received...` );

      data.commitInfo = commitInfo;
      data.vnuVersion = getVnuVersion ( commitInfo.committer.date );

      return fsPromise.emptyDir ( data.opts.cacheDir );

    } )

    /** 4. Clone project to cache dir */
    .then ( () => {

      console.log ( `[${showTime ()}] Status: Cache dir "${data.opts.cacheDir}" was created...` );

      return exec ( `git clone -q https://github.com/${data.opts.repoAuthor}/${data.opts.repoName}.git ${data.opts.cacheDir}` )
        .then ( d => {

          if ( data.opts.commitGet !== 'last' ) {

            return exec ( `git checkout -q ${data.opts.commitGet}`, {cwd : data.opts.cacheDir} );

          }

          return d;

        } );

    } )

    /** 5. Patch build.py version validator */
    .then ( () => {

      console.log ( `[${showTime ()}] Status: Repository "${data.opts.repoAuthor}/${data.opts.repoName}" was cloned...` );

      return fsPromise.stat ( data.opts.buildFile )
        .then ( () => {

          return fsPromise.readFile ( data.opts.buildFile, {encoding : 'utf8'} );

        } )
        .then ( fileData => {

          fileData = fileData.replace ( /validatorVersion\s=.+/, `validatorVersion = "${data.vnuVersion}"` );

          return fsPromise.writeFile ( data.opts.buildFile, fileData, {encoding : 'utf8'} );

        } );

    } )

    /** 6. Build */
    .then ( () => {

      console.log ( `[${showTime ()}] Status: File "${data.opts.buildFile}" successfully patched...` );

      const relativeBuildDir = data.opts.buildFile.replace ( data.opts.cacheDir, '.' );

      return new Promise ( ( resolve, reject ) => {

        const spawn = require ( 'child_process' ).spawn;
        const build = spawn ( relativeBuildDir, [
          'update',
          'dldeps',
          'build',
          data.opts.outputFileType
        ], {cwd : data.opts.cacheDir} );

        build.stdout.on ( 'data', d => {

          console.log ( d.toString ().trim () );

        } );

        build.stderr.on ( 'data', d => {

          console.log ( d.toString ().trim () );

        } );

        build.on ( 'close', code => {

          if ( code > 0 ) {

            reject ( new Error ( `Build exited with code ${code}` ) );

          } else {

            resolve ();

          }

        } );

      } );

    } )

    /** 7. Copy file to output dir */
    .then ( () => {

      console.log ( `[${showTime ()}] Status: Successfully built "vnu.${data.opts.outputFileType}" file...` );

      return fsPromise.copy (
        `${data.opts.distDir}/vnu.${data.opts.outputFileType}`,
        `${data.opts.outputDir}/vnu.${data.opts.outputFileType}`,
        {
          clobber : true
        }
      );

    } )

    /** Remove cache */
    .then ( () => {

      console.log ( `[${showTime ()}] Status: file "vnu.${data.opts.outputFileType}" has been successfully copied to "${data.opts.outputDir}"...` );

      return fsPromise.remove ( data.opts.cacheDir );

    } )

    /** Return data */
    .then ( () => {

      console.log ( `[${showTime ()}] Status: Cache "${data.opts.cacheDir}" was removed...` );

      console.timeEnd ( `Build Validator Nu file successfully` );

      return data;

    } )

    /** Catch error and remove cache */
    .catch ( error => {

      fsPromise.remove ( data.opts.cacheDir );

      return Promise.reject ( error );

    } );

};
