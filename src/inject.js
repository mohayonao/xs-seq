"use strict";

module.exports = (func) => {
  return () => {
    return (next) => (action) => {
      next(func(action) || action);
    };
  };
};
