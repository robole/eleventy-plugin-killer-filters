const filters = require("../src/filters");

test("ceil", () => {
  expect(filters.ceil(0.95)).toBe(1);
  expect(filters.ceil(4)).toBe(4);
  expect(filters.ceil(7.004)).toBe(8);
});

describe("dateRfc822", () => {
  test("convert a Date to a RCF 822 string", () => {
    // this uses local time of system
    const date = new Date(2024, 0, 21, 0, 0, 0);
    const parsedDate = filters.dateRfc822(date);

    expect(parsedDate).toMatch(
      /\w{3}, \d{2} Jan 2024 \d{2}:\d{2}:\d{2} \+\d{2}:\d{2}/
    );
  });

  test("convert a Date object created with a string with explicit UTC timezone and same timezone as output to a RCF 822 string", () => {
    const date = new Date("21 January 2024 14:48 UTC");
    const parsedDate = filters.dateRfc822(date);

    expect(parsedDate).toBe("Sun, 21 Jan 2024 14:48:00 +00:00");
  });

  test("convert a Date object created with a string with explicit offset to a RCF 822 string", () => {
    let d = new Date("Jan 21 2024 14:48:02 -0500");
    const parsedDate = filters.dateRfc822(d);

    expect(parsedDate).toBe("Sun, 21 Jan 2024 19:48:02 +00:00");
  });
});

describe("dateRfc3339", () => {
  test("convert a timestamp to RCF 3339 string", () => {
    // this uses the local time
    const date = new Date(2024, 0, 21, 14, 48, 2);
    const parsedDate = filters.dateRfc3339(date);

    expect(parsedDate).toMatch(/2024-01-\d{2}T\d{2}:\d{2}:\d{2}\+\d{2}:\d{2}/);
  });

  test("convert a Date object created with a string with explicit UTC timezone to RCF 3339 string", () => {
    const date = new Date("21 January 2024 14:48 UTC");
    const parsedDate = filters.dateRfc3339(date);

    expect(parsedDate).toBe("2024-01-21T14:48:00+00:00");
  });

  test("convert a Date object created with a string with explicit offset to RCF 3339 string", () => {
    let d = new Date("Jan 21 2024 14:48:02 -0500");
    const parsedDate = filters.dateRfc3339(d);

    expect(parsedDate).toBe("2024-01-21T19:48:02+00:00");
  });
});

describe("getNewestCollectionItemDate", () => {
  test("get the latest date from a collection", () => {
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

  test("get the latest date from an empty collection", () => {
    let now = new Date();

    expect(filters.getNewestCollectionItemDate(null, now)).toStrictEqual(now);
    expect(filters.getNewestCollectionItemDate([], now)).toStrictEqual(now);
  });
});

test("floor", () => {
  expect(filters.floor(0.95)).toBe(0);
  expect(filters.floor(4)).toBe(4);
  expect(filters.floor(7.004)).toBe(7);
});

test("trunc", () => {
  expect(filters.trunc(10.95)).toBe(10);
  expect(filters.trunc(-42.84)).toBe(-42);
});
