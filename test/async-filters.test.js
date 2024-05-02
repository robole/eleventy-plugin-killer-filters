const asyncFilters = require("../src/async-filters");

describe("htmlToAbsoluteUrls", () => {
  test("Change the `href` of an `a` tag that contains a fragment link into an absolute url", async () => {
    let html = `<a href="#testanchor">Hello</a>`;
    let expected = `<a href="http://example.com/#testanchor">Hello</a>`;

    let result = await asyncFilters.htmlToAbsoluteUrls(
      html,
      "http://example.com/"
    );

    expect(result).toBe(expected);
  });

  test("Should throw an error when the `base` parameter is not provided", async () => {
    let html = `<a href="#testanchor">Hello</a>`;

    try {
      await asyncFilters.htmlToAbsoluteUrls(html);
      throw new Error("Did not throw error");
    } catch (err) {
      expect(err.message).toMatch(/htmlToAbsoluteUrls/i);
    }
  });

  test("Change the `href` of an `a` tag that contains a relative path into an absolute url", async () => {
    let html = `<a href="test.html">Hello</a>`;
    let expected = `<a href="http://example.com/test.html">Hello</a>`;

    let result = await asyncFilters.htmlToAbsoluteUrls(
      html,
      "http://example.com/"
    );

    expect(result).toBe(expected);
  });

  test("Change the `src` of an `img` tag that contains a relative path into an absolute url", async () => {
    let html = `<img src="/test.png" alt="this is test image">`;
    let expected = `<img src="http://example.com/test.png" alt="this is test image">`;

    let output = await asyncFilters.htmlToAbsoluteUrls(
      html,
      "http://example.com/"
    );

    expect(output).toBe(expected);
  });

  test("Change the `src` of an `img` tag that contains a relative path into an absolute url and have the tag have a trailing slash", async () => {
    let html = `<img src="/test.png" alt="this is test image">`;
    let expected = `<img src="http://example.com/test.png" alt="this is test image" />`;

    let output = await asyncFilters.htmlToAbsoluteUrls(
      html,
      "http://example.com/",
      {
        closingSingleTag: "slash",
      }
    );

    expect(output).toBe(expected);
  });
});
