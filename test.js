/**
 * Tests using AVA
 */

import isPlainObject from 'is-plain-object';
import test from 'ava';
import m from './';

test ( 'Build vnu.jar with default options (jar)', t => {

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
