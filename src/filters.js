const { DateTime } = require("luxon");
const { URL } = require("url");
const constants = require("./constants");
const debugA = require("debug")("EleventyPluginKillerFilters:absoluteUrl");

let defaultZone = "utc";

/**
 * Convert a relative URL or an absolute path to an absolute URL
 * including protocol and a domain.
 *
 * @param {string | object } url - A string or any other object with a stringifier — including, for example, an <a> or <area> element — that represents an absolute or relative URL. If url is a relative URL, base is required, and will be used as the base URL. If url is an absolute URL, a given base will be ignored.
 * @param {string} baseUrl - A string representing the base URL to use in cases where url is a relative URL. If not specified, it defaults to `undefined`.
 * @return {string} The absolute url. If there is an error, the original url is returned.
 */
function absoluteUrl(url, baseUrl) {
  if (baseUrl === undefined || baseUrl === null || baseUrl === "") {
    throw new Error(
      `${constants.ERORR_MESSAGE_PREFIX}:absoluteUrl - The baseUrl parameter was missing or empty.`
    );
  }

  let absUrl = url;
  //  if (this.eleventy.env.runMode === "build") {

  try {
    absUrl = new URL(url, baseUrl).toString();
  } catch (e) {
    debugA(
      "Trying to convert %o to be an absolute url with baseUrl %o and failed, returning: %o (invalid url)",
      url,
      baseUrl,
      url
    );
  }

  return absUrl;
}

exports.absoluteUrl = absoluteUrl;

exports.ceil = Math.ceil;

/**
 * Format a date to a string that meets the Date and Time specifications defined by [RFC 822](https://www.rfc-editor.org/rfc/rfc822.html).
 *
 * @param {Date} date - The date to format
 * @return {string} A RCF 822 formatted string representation of the date
 */
function dateRfc822(date) {
  const dt = DateTime.fromJSDate(date, { zone: defaultZone });

  return dt.toFormat("EEE, dd MMM yyyy HH:mm:ss ZZ");
}

exports.dateRfc822 = dateRfc822;

function dateRfc3339(date) {
  const dt = DateTime.fromJSDate(date, { zone: defaultZone });
  return dt.toFormat("yyyy-MM-dd'T'HH:mm:ssZZ");
}

exports.dateRfc3339 = dateRfc3339;

/*
 * Returns a more readable string representation of a date, in the form of '28 Nov 2022'
 */
function dateShort(date) {
  const dt = DateTime.fromJSDate(date, { zone: defaultZone });
  return dt.toFormat("dd LLL yyyy");
}

exports.dateShort = dateShort;

/*
 * Gets the most recent item in a collection based on the `date` field.
 *
 */
function getNewestCollectionItemDate(collection, emptyFallbackDate) {
  if (!collection || !collection.length) {
    return emptyFallbackDate || new Date();
  }

  return new Date(Math.max(...collection.map((item) => item.date)));
}

exports.getNewestCollectionItemDate = getNewestCollectionItemDate;

exports.floor = Math.floor;

// exports.round = Math.round;

exports.trunc = Math.trunc;
