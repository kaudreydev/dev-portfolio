import htmlReplace from "@lib/html-replace";
import { expect, test } from "vitest";

test("replaces items in the provided HTML string", () => {
  const template = `
        Word Zero: \${0}<br />
        Word One: \${1}<br />
        Word Two: \${2}<br />
    `;

  const input = htmlReplace(template, "Foo", "Bar", "Baz");

  expect(input).toEqual(`
        Word Zero: Foo<br />
        Word One: Bar<br />
        Word Two: Baz<br />
    `);
});
