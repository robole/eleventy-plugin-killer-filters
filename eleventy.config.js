const filters = require("./src/filters");
const asyncFilters = require("./src/async-filters");

let pluginOptions = {
  baseurl: "",
  posthtmlOptions: {
    closingSingleTag: "slash",
  },
};

/** @param {import("@11ty/eleventy").UserConfig} config */
module.exports = function (config, options = {}) {
  let mergedOptions = { ...pluginOptions, ...options };

  // eslint-disable-next-line prefer-arrow-callback
  config.addNunjucksFilter("absoluteUrl", function (url) {
    let production = this.eleventy.env.runMode === "build";

    return filters.absoluteUrl(url, mergedOptions.baseurl, production);
  });

  config.addNunjucksFilter("ceil", filters.ceil);
  config.addNunjucksFilter("dateRfc822", filters.dateRfc822);
  config.addNunjucksFilter("dateRfc3339", filters.dateRfc3339);
  config.addNunjucksFilter("dateShort", filters.dateShort);
  config.addNunjucksFilter(
    "getMostRecentDate",
    filters.getNewestCollectionItemDate
  );
  config.addNunjucksFilter("floor", filters.floor);
  config.addNunjucksFilter("group", filters.group);
  config.addNunjucksFilter("trunc", filters.trunc);

  // async nunjucks filters require a callback
  config.addNunjucksAsyncFilter("htmlAbsoluteUrls", (html, base, callback) => {
    asyncFilters
      .htmlToAbsoluteUrls(html, base, mergedOptions.posthtmlOptions)
      .then((htmlOutput) => {
        callback(null, htmlOutput);
      });
  });
};

module.exports.dateRfc822 = filters.dateRfc822;
module.exports.dateRfc3339 = filters.dateRfc3339;
module.exports.dateShort = filters.dateShort;
