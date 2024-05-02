const posthtml = require("posthtml");
const urls = require("posthtml-urls");
const constants = require("./constants");
const { absoluteUrl } = require("./filters");

/*
 * Transform all URLs in a block of HTML to an absolute url.
 *
 * Uses [PostHMTL tool for transforming HTML/XML](https://www.npmjs.com/package/posthtml) with the [posthtml-urls plugin](https://www.npmjs.com/package/posthtml-urls).
 *
 * @param {string} html - The HTML content
 * @param {string} baseUrl - A string representing the base URL to use in cases where url is a relative URL. If not specified, an error is thrown.
 * @param {object} processOptions - Processing options for [PostHML](https://www.npmjs.com/package/posthtml).
 *  Consult the [docs](https://github.com/posthtml/posthtml-render?tab=readme-ov-file#options) for more info on the options.
 */
async function htmlToAbsoluteUrls(html, baseUrl, processOptions = {}) {
  if (baseUrl === undefined || baseUrl === null || baseUrl === "") {
    throw new Error(
      `${constants.ERORR_MESSAGE_PREFIX}:htmlToAbsoluteUrls - The baseUrl parameter was missing or empty.`
    );
  }

  let urlOptions = {
    eachURL(url) {
      return absoluteUrl(url.trim(), baseUrl);
    },
  };

  let modifier = posthtml().use(urls(urlOptions));

  let result = await modifier.process(html, processOptions);
  return result.html;
}

exports.htmlToAbsoluteUrls = htmlToAbsoluteUrls;
