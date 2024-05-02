const filters = require("../src/filters");

describe("absoluteUrl", () => {
  test("should convert a relative url to an absolute url based on the 'baseurl' parameter provided", () => {
    let url = "/tech/blog";
    let baseurl = "https://www.example.com";

    expect(filters.absoluteUrl(url, baseurl)).toBe(
      "https://www.example.com/tech/blog"
    );
  });

  test("should only convert a relative url to an absolute url when in production", () => {
    let url = "/tech/blog";
    let baseurl = "https://www.example.com";
    let production = false;

    expect(filters.absoluteUrl(url, baseurl, production)).toBe(url);
  });

  test("should throw an error when the 'baseurl' parameter is not provided", () => {
    let url = "/tech/blog";

    expect(() => {
      filters.absoluteUrl(url);
    }).toThrow();

    expect(() => {
      filters.absoluteUrl(url, null);
    }).toThrow();
  });
});

describe("ceil", () => {
  test("should round a number up to neares whole number", () => {
    expect(filters.ceil(0.95)).toBe(1);
    expect(filters.ceil(7.004)).toBe(8);
  });
});

describe("dateRfc822", () => {
  test("should convert a Date to a RCF 822 string", () => {
    // this uses local time of system
    const date = new Date(2024, 0, 21, 0, 0, 0);
    const parsedDate = filters.dateRfc822(date);

    expect(parsedDate).toMatch(
      /\w{3}, \d{2} Jan 2024 \d{2}:\d{2}:\d{2} \+\d{2}:\d{2}/
    );
  });

  test("should convert a Date object created with a string with explicit UTC timezone and same timezone as output to a RCF 822 string", () => {
    const date = new Date("21 January 2024 14:48 UTC");
    const parsedDate = filters.dateRfc822(date);

    expect(parsedDate).toBe("Sun, 21 Jan 2024 14:48:00 +00:00");
  });

  test("should convert a Date object created with a string with explicit offset to a RCF 822 string", () => {
    let d = new Date("Jan 21 2024 14:48:02 -0500");
    const parsedDate = filters.dateRfc822(d);

    expect(parsedDate).toBe("Sun, 21 Jan 2024 19:48:02 +00:00");
  });
});

describe("dateRfc3339", () => {
  test("should convert a timestamp to RCF 3339 string", () => {
    // this uses the local time
    const date = new Date(2024, 0, 21, 14, 48, 2);
    const parsedDate = filters.dateRfc3339(date);

    expect(parsedDate).toMatch(/2024-01-\d{2}T\d{2}:\d{2}:\d{2}\+\d{2}:\d{2}/);
  });

  test("should convert a Date object created with a string with explicit UTC timezone to RCF 3339 string", () => {
    const date = new Date("21 January 2024 14:48 UTC");
    const parsedDate = filters.dateRfc3339(date);

    expect(parsedDate).toBe("2024-01-21T14:48:00+00:00");
  });

  test("should convert a Date object created with a string with explicit offset to RCF 3339 string", () => {
    let d = new Date("Jan 21 2024 14:48:02 -0500");
    const parsedDate = filters.dateRfc3339(d);

    expect(parsedDate).toBe("2024-01-21T19:48:02+00:00");
  });
});

describe("dateShort", () => {
  test("should convert a Date object to a string like '28 Nov 2022'", () => {
    const date = new Date("2022-11-28");
    expect(filters.dateShort(date)).toBe("28 Nov 2022");
  });
});

describe("group", () => {
  test("should group the elements of an array by a provided property and return a Map", () => {
    let array = [
      {
        year: 2018,
        fileSlug: "post-1",
      },
      {
        year: 2023,
        fileSlug: "post-2",
      },
      {
        year: 2023,
        fileSlug: "post-3",
      },
      {
        year: 2024,
        fileSlug: "post-4",
      },
    ];

    let groupedMap = filters.group(array, "year");

    let expectedMap = new Map();
    expectedMap.set(2018, [
      {
        year: 2018,
        fileSlug: "post-1",
      },
    ]);
    expectedMap.set(2023, [
      {
        year: 2023,
        fileSlug: "post-2",
      },
      {
        year: 2023,
        fileSlug: "post-3",
      },
    ]);
    expectedMap.set(2024, [
      {
        year: 2024,
        fileSlug: "post-4",
      },
    ]);

    expect(groupedMap).toStrictEqual(expectedMap);
  });

  test("should group the elements of an array by a provided property when it is not defined on an object", () => {
    let array = [
      {
        year: 2018,
        fileSlug: "post-1",
      },
      {
        year: 2023,
        fileSlug: "post-2",
      },
      {
        year: 2023,
        fileSlug: "post-3",
      },
      {
        fileSlug: "post-4",
      },
    ];

    let expectedMap = new Map();
    expectedMap.set(2018, [
      {
        year: 2018,
        fileSlug: "post-1",
      },
    ]);
    expectedMap.set(2023, [
      {
        year: 2023,
        fileSlug: "post-2",
      },
      {
        year: 2023,
        fileSlug: "post-3",
      },
    ]);
    expectedMap.set(undefined, [
      {
        fileSlug: "post-4",
      },
    ]);

    let groupedMap = filters.group(array, "year");

    expect(expectedMap).toStrictEqual(groupedMap);
  });

  test("should group the elements of an array by a nested property using dot notation and return a Map", () => {
    let array = [
      {
        year: 2018,
        fileSlug: "post-1",
        data: {
          series: "CSS tutorials",
        },
      },
      {
        year: 2023,
        fileSlug: "post-2",
        data: {
          series: "CSS tutorials",
        },
      },
      {
        year: 2023,
        fileSlug: "post-3",
        data: {
          series: "HTML tutorials",
        },
      },
    ];

    let expectedMap = new Map();
    expectedMap.set("CSS tutorials", [
      {
        year: 2018,
        fileSlug: "post-1",
        data: {
          series: "CSS tutorials",
        },
      },
      {
        year: 2023,
        fileSlug: "post-2",
        data: {
          series: "CSS tutorials",
        },
      },
    ]);
    expectedMap.set("HTML tutorials", [
      {
        year: 2023,
        fileSlug: "post-3",
        data: {
          series: "HTML tutorials",
        },
      },
    ]);

    let groupedMap = filters.group(array, "data.series");

    expect(expectedMap).toStrictEqual(groupedMap);
  });

  test("should throw an error when the property provided resolves to undefined", () => {
    expect(1).toBe(2);
  });
});

describe("getNewestCollectionItemDate", () => {
  test("should get the latest date from a collection", () => {
    let first = new Date(2018, 1, 1);
    let second = new Date(2019, 1, 1);
    let array = [
      {
        date: first,
      },
      {
        date: second,
      },
    ];

    expect(filters.getNewestCollectionItemDate(array)).toStrictEqual(second);
  });

  test("should get the latest date from an empty collection", () => {
    let now = new Date();

    expect(filters.getNewestCollectionItemDate(null, now)).toStrictEqual(now);
    expect(filters.getNewestCollectionItemDate([], now)).toStrictEqual(now);
  });
});

describe("floor", () => {
  test("should round a number down", () => {
    expect(filters.floor(0.95)).toBe(0);
    expect(filters.floor(7.004)).toBe(7);
  });
});

describe("trunc", () => {
  test("should return the integer part omitting any fractional digits", () => {
    expect(filters.trunc(10.95)).toBe(10);
    expect(filters.trunc(-42.84)).toBe(-42);
  });
});
