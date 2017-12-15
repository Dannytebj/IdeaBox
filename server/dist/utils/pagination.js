"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @function pagination
 * @param {number} count
 * @param {number} limit
 * @param {number} offset
 * @returns {object} return an object with the page
 */
var pagination = function pagination(count, limit, offset) {
  var page = Math.floor(offset / limit) + 1;
  var pageCount = Math.ceil(count / limit);
  var pageSize = count - offset > limit ? limit : count - offset;
  return {
    page: page,
    pageCount: pageCount,
    pageSize: pageSize,
    count: count
  };
};
exports.default = pagination;