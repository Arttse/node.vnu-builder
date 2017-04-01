'use strict';

/** Modules */
const fs = require ( 'fs-extra' );


/**
 * Promise wrapper for copy files or dirs.
 *
 * @param from
 * @param to
 * @returns {Promise}
 */
module.exports.copy = ( from, to ) => {

  return new Promise ( ( resolve, reject ) => {

    fs.copy ( from, to, err => {

      if ( err ) {

        reject ( err );

      }

      resolve ();

    } );

  } );

};

/**
 * Promise Wrapper.
 * Ensures that a directory is empty.
 * Deletes directory contents if the directory is not empty.
 * If the directory does not exist, it is created.
 * The directory itself is not deleted.
 *
 * @param dir
 * @returns {Promise}
 */
module.exports.emptyDir = dir => {

  return new Promise ( ( resolve, reject ) => {

    fs.emptyDir ( dir, err => {

      if ( err ) {

        reject ( err );

      }

      resolve ();

    } );

  } );

};

/**
 * Promise Wrapper.
 * Asynchronously reads the entire contents of a file
 *
 * @param file
 * @param options
 * @returns {Promise}
 */
module.exports.readFile = ( file, options ) => {

  options = options || {};

  return new Promise ( ( resolve, reject ) => {

    fs.readFile ( file, options, ( err, data ) => {

      if ( err ) {

        reject ( err );

      }

      resolve ( data );

    } );

  } );

};

/**
 * Promise Wrapper.
 * Get file status
 *
 * @param file
 * @returns {Promise}
 */
module.exports.stat = file => {

  return new Promise ( ( resolve, reject ) => {

    fs.stat ( file, ( err, stat ) => {

      if ( err ) {

        reject ( err );

      }

      resolve ( stat );

    } );

  } );

};

/**
 * Promise Wrapper for remove files or dirs.
 *
 * @param dir
 * @returns {Promise}
 */
module.exports.remove = dir => {

  return new Promise ( ( resolve, reject ) => {

    fs.remove ( dir, err => {

      if ( err ) {

        reject ( err );

      }

      resolve ();

    } );

  } );

};

/**
 * Promise Wrapper.
 * Asynchronously writes data to a file, replacing the file if it already exists.
 *
 * @param file
 * @param data
 * @param options
 * @returns {Promise}
 */
module.exports.writeFile = ( file, data, options ) => {

  options = options || {};

  return new Promise ( ( resolve, reject ) => {

    fs.writeFile ( file, data, options, err => {

      if ( err ) {

        reject ( err );

      }

      resolve ();

    } );

  } );

};
