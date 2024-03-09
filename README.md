# Killer filters

> This is a work-in-progress and is just for personal use at the moment.

This is an Eleventy plugin that provide killer filters to make writing templates simpler. In particular, nunjucks is missing filters for dates and transforming filenames to URLs.

## Filters

| Name  | Description   | More Info |
|-------------- | -------------- | -------------- |
| `absoluteUrl` | Convert a relative URL or an absolute path to an absolute URL including protocol, domain, full path. | [Read more](#absoluteurl) |
| `ceil`   |  Round a number up. It returns the smallest integer greater than or equal to a given number. This is the [`Math.ceil()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil) method. | [Read more](#ceil) |
| `floor`  |  Round a number down. It returns the largest integer less than or equal to a given number. This is the [`Math.floor()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor) method. | [Read more](#floor) |
| `dateRfc822`   |  Convert a Date into a valid [RFC-822](https://www.rfc-editor.org/rfc/rfc822.html) format. This is used for RSS feeds. Format is: *Sun, 21 Jan 2024 14:48:02 +00:00*. | [Read more](#datetorfc822) |
| `dateRfc339`   |  Convert a Date into a valid [RFC 3339](https://datatracker.ietf.org/doc/html/rfc3339) format. This is used for Atom feeds. Format is: *2024-01-21T14:48:02+00:00*. | [Read more](#datetorfc339) |
| `htmlToAbsoluteUrls`   |  Transform all  URLs in a block of HTML to an absolute url. | [Read more](#htmltoabsoluteurls) |
| `trunc`   | Returns the integer part of a number by removing any fractional digits. Thishttps://liquidjs.com/index.html is the [`Math.trunc()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc) method.   | [Read more](#trunc) |

### absoluteUrl

Convert a relative URL or an absolute file path to an absolute URL including protocol, domain, full path.

### ceil

Round a number up. It returns the smallest integer greater than or equal to a given number. This is the [`Math.ceil()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil) method.

### dateRfc822

Format a `Date` to a string that meets the date and time specifications defined by [RFC 822](https://www.rfc-editor.org/rfc/rfc822.html).

This filter returns a date in the following specific format: *Sun, 21 Jan 2024 14:48:02 +00:00*. Other variations can comply with the specification too, of course! The timezone component is fixed as UTC.

This date format is used for dates in [RSS feeds](https://www.rssboard.org/rss-specification)`.

### dateRfc339

Format a `Date` to a string that meets the Date and Time specifications as defined by [RFC 3339](https://datatracker.ietf.org/doc/html/rfc3339).

This filter returns a date in the following format: *2024-01-21T14:48:00+00:00*. Other variations can comply with the specification too, of course! The timezone component is fixed as UTC.

This date format is used for all dates in [Atom feeds (The Atom Syndication Format)](https://www.rfc-editor.org/rfc/rfc4287).

### floor

Round a number down. It returns the largest integer less than or equal to a given number. This is the [`Math.floor()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor) method.

### htmlToAbsoluteUrls

Transform all URLs in a block of HTML to an absolute url.

## Dates in Eleventy

Many date formats in Eleventy assume that the time is midnight in UTC. For example, when a filename is *YYYY-MM-DD-myfile.md* or the front matter has `date: YYYY-MM-DD`.

You usually don't need to worry about time zones and offsets. However, if you want to set the time portion of a date, you need to be mindful that the output may vary depending on the timezone of the system that generates your website. Dates are messy in JavaScript because the [`Date` object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) does not store an explicit timezone, it is stored as timestamp.

If you want the exact same date time available everywhere, it is simplest if you stick with UTC everywhere. Setting the front matter date as `date: 2016-05-25T09:24Z` ensures this. Note that the letter *Z* at the end to indicate it is a UTC time.

If you want to format the date for another timezone or offset, I recommend setting the date in front matter with the offset from UTC like this `date: 2016-05-25T09:24+0100`. You can use any other valid [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date that [Luxon’s `DateTime.fromISO()`](https://moment.github.io/luxon/#/parsing?id=iso-8601) can parse. This format does not permit a timezone such as "America/New_York".

The default date of a file is the file creation date. Keep this in mind if you are using the date of the file for something!

## Resources

- [Nunjucks docs](https://github.com/mozilla/nunjucks)
- [LiquidJS docs](https://github.com/harttle/liquidjs)
