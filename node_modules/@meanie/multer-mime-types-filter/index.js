'use strict';

/**
 * Mime types filter
 */
module.exports = function(mimeTypes) {
  return function mimeTypesFilter(req, file, cb) {
    if (mimeTypes.includes(file.mimetype)) {
      cb(null, true);
    }
    cb(null, false);
  };
};
