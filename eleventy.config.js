const filters = require("./src/filters");
// const asyncFilters = require("./src/async-filters");

let pluginOptions = {
  baseUrl: "",
};

/** @param {import("@11ty/eleventy").UserConfig} config */
module.exports = function (config, options = {}) {
  let mergedOptions = { ...pluginOptions, ...options };

  // eslint-disable-next-line prefer-arrow-callback
  config.addFilter("absoluteUrl", function (url) {
    return filters.absoluteUrl(url, mergedOptions.baseUrl);
  });

  config.addFilter("ceil", filters.ceil);
  config.addFilter("dateRfc822", filters.dateRfc822);
  config.addFilter("dateRfc3339", filters.dateRfc3339);
  config.addFilter("dateShort", filters.dateShort);
  config.addFilter("getMostRecentDate", filters.getNewestCollectionItemDate);
  config.addFilter("floor", filters.floor);
  config.addFilter("trunc", filters.trunc);

  // Object.keys(asyncFilters).forEach((name) => {
  //   config.addNunjucksAsyncFilter(name, asyncFilters[name]);
  // });
};

module.exports.dateRfc822 = filters.dateRfc822;
module.exports.dateRfc3339 = filters.dateRfc3339;
module.exports.dateShort = filters.dateShort;
