const posthtml = require("posthtml");
const urls = require("posthtml-urls");
const { absoluteUrl } = require("./filters");

/*
 * Transform all URLs in a block of HTML to an absolute url.
 *
 * Uses [PostHML tool for transforming HTML/XML](https://www.npmjs.com/package/posthtml) with the [posthtml-urls plugin](https://www.npmjs.com/package/posthtml-urls).
 *
 * @param {string} html - The HTML content
 * @param {string} base - A string representing the base URL to use in cases where url is a relative URL. If not specified, an error is thrown.
 * @param {object} processOptions - Processing options for [PostHML](https://www.npmjs.com/package/posthtml).
 *  Consult the [docs](https://github.com/posthtml/posthtml-render?tab=readme-ov-file#options) for more info on the options.
 */
async function htmlToAbsoluteUrls(html, base, processOptions = {}) {
  if (!base) {
    throw new Error(
      "eleventy-plugin, htmlToAbsoluteUrls filter was missing the base parameter."
    );
  }

  let urlOptions = {
    eachURL(url) {
      return absoluteUrl(url.trim(), base);
    },
  };

  let modifier = posthtml().use(urls(urlOptions));

  let result = await modifier.process(html, processOptions);
  return result.html;
}

exports.htmlToAbsoluteUrls = htmlToAbsoluteUrls;
