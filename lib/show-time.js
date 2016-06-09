'use strict';

/**
 * Show current time
 *
 * @returns {string}
 */
module.exports = () => {

  const timeNow = new Date ();
  const hours   = timeNow.getHours ();
  const minutes = timeNow.getMinutes ();
  const seconds = timeNow.getSeconds ();

  return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;

};
