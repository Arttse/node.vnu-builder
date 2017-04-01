'use strict';

/**
 * Date convert to VNU version
 *
 * @param {String|Number|Date} vnuDate - real date to convert vnuVersion
 * @returns {string} - "year.month.day"
 */
module.exports = vnuDate => {

  const date  = vnuDate instanceof Date ? vnuDate : new Date ( vnuDate );
  const year  = date.getFullYear ().toString ().substr ( 2 );
  const month = ( date.getMonth () + 1 ).toString ();
  const day   = date.getDate ().toString ();

  return `${year}.${month}.${day}`;

};
