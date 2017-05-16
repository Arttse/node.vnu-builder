'use strict';

module.exports = data => {
  const spin = data.opts.spin;
  const checksData = [];
  let chain = Promise.resolve ( checksData );

  if ( spin ) {
    spin.text = 'Checking requirements';
    spin.start ();
  }

  /** Checking Git */
  chain = chain.then ( require ( './git' ) );

  /** Checking Python */
  chain = chain.then ( require ( './python' ) );

  /** Checking Java */
  chain = chain.then ( require ( './java' ) );

  /** Checking Javac */
  chain = chain.then ( require ( './javac' ) );

  /** Checking JAVA_HOME environment variable */
  chain = chain.then ( require ( './env-java-home' ) );

  /** Working with data */
  chain = chain.then ( checksData => {
    const notPassed = checksData.filter ( m => !m.pass );

    if ( notPassed.length > 0 ) {
      let text = '';

      notPassed.forEach ( ( v, i ) => {
        text += `${ i === 0 ? '' : '\n'} - ${v.name} ${v.message}`;
      } );

      return Promise.reject ( text );
    }

  } );

  return chain.then ( () => {
    if ( spin ) {
      spin.stop ();
    }

    return data;
  } );
};
