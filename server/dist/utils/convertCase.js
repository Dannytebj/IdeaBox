"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @function capitalizeFirstLetter
 *
 * @return { object } a string in lowercase and the First letter in Capital
 *
 * @param { String } text
 */
var convertCase = function convertCase(text) {
  var string = text.toLowerCase();
  return string.charAt(0).toUpperCase() + string.slice(1);
};
exports.default = convertCase;