const filters = require("./src/filters");
const asyncFilters = require("./src/async-filters");

/** @param {import("@11ty/eleventy").UserConfig} config */
module.exports = function (config, options = {}) {
  Object.keys(filters).forEach((name) => {
    config.addNunjucksFilter(name, filters[name]);
  });

  Object.keys(asyncFilters).forEach((name) => {
    config.addNunjucksAsyncFilter(name, asyncFilters[name]);
  });

  // return {
  //   dir: {
  //     input: "sample",
  //     output: "_site",
  //     includes: "includes",
  //     layouts: "layouts",
  //     data: "data",
  //   },
  //   templateFormats: ["njk", "md"],
  //   markdownTemplateEngine: "njk",
  // };
};
