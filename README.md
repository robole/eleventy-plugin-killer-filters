# Killer filters

> This is a work-in-progress and is just for personal use at the moment.

This is an Eleventy plugin that provides some killer filters to make writing templates simpler. In particular, [Nunjucks](https://mozilla.github.io/nunjucks/) is missing filters for dates and working with URLs.

## Usage

Install the project through npm:

```shell
npm install eleventy-plugin-killer-filters --save
```

Add the plugin to your eleventy config file. Your config file is named `.eleventy.js` or `eleventy.config.js`.

```javascript
// .eleventy.js
const pluginFilters = require("eleventy-plugin-killer-filters");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginFilters);
};
```

You can supply an optional second argument to `addPlugin` to customize the plugin’s behavior through an options object. See [Plugin Configuration Options](#plugin-configuration-options) section for more info.

## Filters

| Name  | Description   | More Info | Done |
|-------------- | -------------- | -------------- | --- |
| `absoluteUrl` | Convert a relative URL or an absolute path to an absolute URL. | - | ✅ |
| `ceil`   |  Round a number up. Uses the [`Math.ceil()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil) method. |  - | ✅ |
| `floor`  |  Round a number down. Uses the [`Math.floor()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor) method. | - | ✅ |
| `dateRfc822`   |  Convert a Date into a valid [RFC-822](https://www.rfc-editor.org/rfc/rfc822.html) format: *Sun, 21 Jan 2024 14:48:02 +00:00*. This format is used in RSS feeds. | [Read more](#datetorfc822) |
| `dateRfc339`   |  Convert a Date into a valid [RFC 3339](https://datatracker.ietf.org/doc/html/rfc3339) format: *2024-01-21T14:48:00+00:00*. This format is used in Atom feeds. | [Read more](#datetorfc339) |
| `dateShort`   |  Convert a Date into a short, more readable format: *21 Jan 2024*. | - |
|`getMostRecentDate` | Get the most recent date found in `date` field in a collection. | - |
|`group` | Group an array’s items by a given property. Returns a `Map` unlike the `groupBy` nunjucks filter. | - |
|`htmlToAbsoluteUrls` | (async) Transform all of the URLs in a block of HTML with the `absoluteUrl` filter. Uses posthtml-urls. |
| `trunc`   | Returns the integer part of a number by removing any fractional digits. It is the [`Math.trunc()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc) method.   | - |

### absoluteUrl

Convert a relative URL or an absolute path to an absolute URL. You must provide the `baseurl` option as below:

```javascript
// .eleventy.js
const pluginFilters = require("eleventy-plugin-killer-filters");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginFilters, { baseurl : "https://www.roboleary.net" });
};
```

For example when used in a template, the following `{{ "about.html" | absoluteUrl }}` will produce "https://www.roboleary.net/about.html".

Conversion only occurs when eleventy is run in production (running with `--build` flag). If there was [access to the local server when running in dev mode (running with `--serve` flag)](https://github.com/11ty/eleventy/issues/3273), I would use this to always produce an absolute URL.

### dateRfc822

Format a `Date` to a string that meets the date and time specifications defined by [RFC 822](https://www.rfc-editor.org/rfc/rfc822.html).

This filter returns a date in the following specific format: *Sun, 21 Jan 2024 14:48:02 +00:00*. Other variations can comply with the specification too, of course! The timezone component is fixed as UTC.

This date format is used for dates in [RSS feeds](https://www.rssboard.org/rss-specification)`.

### dateRfc339

Format a `Date` to a string that meets the Date and Time specifications as defined by [RFC 3339](https://datatracker.ietf.org/doc/html/rfc3339).

This filter returns a date in the following format: *2024-01-21T14:48:00+00:00*. Other variations can comply with the specification too, of course! The timezone component is fixed as UTC.

This date format is used for all dates in [Atom feeds (The Atom Syndication Format)](https://www.rfc-editor.org/rfc/rfc4287).

## Plugin Configuration Options

Use an optional second argument to `addPlugin` to customize the plugin’s behavior through an options object.

```javascript
const pluginFilters = require("eleventy-plugin-killer-filters");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginFilters, {
    baseurl: "https://www.11ty.dev",
    posthtmlOptions: {
      closingSingleTag: "default" // opt-out of <img/> style XHTML single tags
    }
  });
};
```

The options object can contain the following properties:
- `baseurl`: A string representing the base URL to use in cases where a url is relative and is being converted to an absolute url by filters such as `absoluteUrl` and `htmlToAbsoluteUrls`.
- `posthtmlOptions`: Advanced control of [PostHTML options](https://github.com/posthtml/posthtml-render#options) that affect output from the `htmlToAbsoluteUrls` filter.

## Dates in Eleventy

Many date formats in Eleventy assume that the time is midnight in UTC. For example, when a filename is *YYYY-MM-DD-myfile.md* or the front matter has `date: YYYY-MM-DD`.

You usually don't need to worry about time zones and offsets. However, if you want to set the time portion of a date, you need to be mindful that the output may vary depending on the timezone of the system that generates your website. Dates are messy in JavaScript because the [`Date` object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) does not store an explicit timezone, it is stored as timestamp.

If you want the exact same date time available everywhere, it is simplest if you stick with UTC everywhere. Setting the front matter date as `date: 2016-05-25T09:24Z` ensures this. Note that the letter *Z* at the end to indicate it is a UTC time.

If you want to format the date for another timezone or offset, I recommend setting the date in front matter with the offset from UTC like this `date: 2016-05-25T09:24+0100`. You can use any other valid [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date that [Luxon’s `DateTime.fromISO()`](https://moment.github.io/luxon/#/parsing?id=iso-8601) can parse. This format does not permit a timezone such as "America/New_York".

The default date of a file is the file creation date. Keep this in mind if you are using the date of the file for something!

## Resources

- [Nunjucks docs](https://github.com/mozilla/nunjucks)
- [LiquidJS docs](https://github.com/harttle/liquidjs)
