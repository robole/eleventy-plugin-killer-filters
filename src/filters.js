const { DateTime } = require("luxon");
const { URL } = require("url");
const constants = require("./constants");
const util = require("./util");

const debugA = require("debug")("EleventyPluginKillerFilters:absoluteUrl");

let defaultZone = "utc";

/**
 * Convert a relative URL or an absolute path to an absolute URL
 * including protocol and a domain. Conversion only occurs when eleventy is run in production/build mode.
 *
 * @param {string | object } url - A string or any other object with a stringifier — including, for example, an <a> or <area> element — that represents an absolute or relative URL. If url is a relative URL, base is required, and will be used as the base URL. If url is an absolute URL, a given base will be ignored.
 * @param {string} baseurl - A string representing the base URL to use in cases where url is a relative URL. If not specified, it defaults to `undefined`.
 * @param {boolean} production - A boolean indicating if eleventy is running in production or not
 * @return {string} The absolute url. If there is an error, the original url is returned.
 */
function absoluteUrl(url, baseurl, production = true) {
  if (baseurl === undefined || baseurl === null) {
    throw new Error(
      `${constants.ERORR_MESSAGE_PREFIX}:absoluteUrl - The baseurl parameter is missing.`
    );
  }

  let absUrl = url;

  if (production) {
    try {
      absUrl = new URL(url, baseurl).toString();
    } catch (e) {
      debugA(
        "absoluteUrl: Trying to convert %o to be an absolute url with baseurl %o and failed, returning: %o (invalid url)",
        url,
        baseurl,
        url
      );
    }
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
function dateRfc822(date, timezone, locale) {
  let dt = DateTime.fromJSDate(date);

  if (timezone !== null) {
    dt = dt.setZone(timezone);
  }

  if (locale !== null) {
    dt = dt.setLocale(locale);
  }

  let formattedDate;

  if (dt.isValid === false) {
    formattedDate = date;

    debugA(
      "dateRfc822: Trying to format %o with timezone %o and locale %o. Reason: %o.",
      date,
      timezone,
      locale,
      formattedDate.invalidReason
    );
  } else {
    formattedDate = dt.toFormat("EEE, dd MMM yyyy HH:mm:ss ZZ");
  }

  return formattedDate;
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

/**
 * Group an array’s items by a given property. If the property does not exist on an item, it will be grouped as `undefined`.
 *
 * @param {Array}  arr - An array.
 * @param {string|number} property - A property to group the data by. Can be a nested property using dot notation.
 * @returns {Map} Map of the grouped data.
 */
function group(arr, property) {
  const map = new Map();
  let array = util.toArray(arr);

  array.forEach((item) => {
    const key = util.getPropertyKey(item, property);

    if (map.has(key)) {
      map.get(key).push(item);
    } else {
      map.set(key, [item]);
    }
  });

  return map;
}

exports.group = group;

exports.floor = Math.floor;

exports.trunc = Math.trunc;
