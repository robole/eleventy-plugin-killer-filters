const util = require("../src/util");

describe("getPropertyKey", () => {
  test("should get the key of the property of an object", () => {
    let obj = {
      year: 2023,
      fileSlug: "post-2",
    };

    expect(util.getPropertyKey(obj, "year")).toBe(2023);
  });

  test("should get the key of property of a nested object using dot notation", () => {
    let obj = {
      date: {
        year: 2023,
      },
      fileSlug: "post-2",
    };

    expect(util.getPropertyKey(obj, "date.year")).toBe(2023);
  });
});
