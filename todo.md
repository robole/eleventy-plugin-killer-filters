# Todo

## Review

1. Use callbacks for the `htmlToAbsoluteUrls` filter. https://www.11ty.dev/docs/languages/nunjucks/#asynchronous-nunjucks-filters
1. Turn error for `absoluteUrl` into debug error.
1. Should  something different for `absoluteUrl` be done when it is in dev mode? Consult Jekyll for comparison - does it give an absolute url with 'localhost:8080'?
1. Make `htmlToAbsoluteUrls` more comprehensible.
1. Minimise repitition in README and source code for docs.

## Filters to add

1. `htmlToAbsoluteUrls`
1. `date`
1. `dateLong`
1. `group` for arrays
1. Some kind of `find` for arrays

## Other filters to consider

1. A `max` filter that works on dates?
1. Overwrite `round`?
