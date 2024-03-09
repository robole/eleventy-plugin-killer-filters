const asyncFilters = require("../src/async-filters");

describe("htmlToAbsoluteUrls", () => {
  test("Change the `href` of an `a` tag that contains a fragment link into an absolute url", async () => {
    let result = await asyncFilters.htmlToAbsoluteUrls(
      `<a href="#testanchor">Hello</a>`,
      "http://example.com/"
    );
    let expected = `<a href="http://example.com/#testanchor">Hello</a>`;

    expect(result).toBe(expected);
  });

  test("Should throw an error when the `base` parameter is not provided", async () => {
    try {
      await asyncFilters.htmlToAbsoluteUrls(`<a href="#testanchor">Hello</a>`);
      throw new Error("Did not throw error");
    } catch (err) {
      expect(err.message).toMatch(/htmlToAbsoluteUrls/i);
    }
  });

  test("Change the `href` of an `a` tag that contains a relative path into an absolute url", async () => {
    let result = await asyncFilters.htmlToAbsoluteUrls(
      `<a href="test.html">Hello</a>`,
      "http://example.com/"
    );
    let expected = `<a href="http://example.com/test.html">Hello</a>`;

    expect(result).toBe(expected);
  });

  test("Change the `src` of an `img` tag that contains a relative path into an absolute url", async () => {
    let output = await asyncFilters.htmlToAbsoluteUrls(
      `<img src="/test.png" alt="this is test image">`,
      "http://example.com/"
    );
    let expected = `<img src="http://example.com/test.png" alt="this is test image">`;

    expect(output).toBe(expected);
  });
});
