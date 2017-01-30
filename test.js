/**
 * Tests using AVA
 */

import isPlainObject from 'is-plain-object';
import test from 'ava';
import m from './';

test ( 'Argument opts throws', async t => {

  const msg = 'Options must be a plain object';

  t.is ( (await t.throws ( m ( '' ) ) ).message, msg );
  t.is ( (await t.throws ( m ( 1 ) ) ).message, msg );
  t.is ( (await t.throws ( m ( true ) ) ).message, msg );
  t.is ( (await t.throws ( m ( [] ) ) ).message, msg );
  t.is ( (await t.throws ( m ( null ) ) ).message, msg );

} );

test ( 'Build vnu.jar with default options', t => {

  return m ()
    .then ( result => {
      t.true ( isPlainObject ( result ) );
    } );

} );

test ( 'Build vnu.war with many of default options (except 2)', t => {

  return m (
    {
      outputFileType : 'war',
      cacheDir       : './.cache-vnu-builder-war'
    }
  )
    .then ( result => {
      t.true ( isPlainObject ( result ) );
    } );

} );
