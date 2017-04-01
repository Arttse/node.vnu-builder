'use strict';

const spawn = require ( 'child_process' ).spawn;

module.exports = data => {
  const spin = data.opts.spin;

  if ( spin ) {
    spin.text = 'Building';
    spin.start ();
  }

  return Promise.resolve ()
    .then ( () => {
      const relativeBuildDir = data.opts.buildFile.replace ( data.opts.cacheDir, '.' );

      return new Promise ( ( resolve, reject ) => {
        const building = spawn ( relativeBuildDir, data.opts.buildingArguments.concat ( data.opts.outputFileType ), {cwd : data.opts.cacheDir} );

        building.stdout.on ( 'data', d => {
          if ( data.opts.buildingShowLog ) {
            console.log ( d.toString ().trim () );
          }
        } );

        building.stderr.on ( 'data', d => {
          if ( data.opts.buildingShowLog ) {
            console.log ( d.toString ().trim () );
          }
        } );

        building.on ( 'close', code => {
          if ( code > 0 ) {
            reject ( new Error ( `Build exited with code ${code}. ${data.opts.buildingShowLog
              ? 'See the output log in terminal for more information'
              : 'Run building with «{buildingShowLog:true}» option for more details'}.` ) );
          } else {
            resolve ();
          }
        } );
      } );

    } )
    .then ( () => {
      if ( spin ) {
        spin.text = `Successfully built «vnu.${data.opts.outputFileType}» with version «${data.vnuVersion}»`;
        spin.succeed ();
      }

      return data;
    } )
};
