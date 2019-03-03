import { cellClassName } from "./cellStyle.js";

test("should return a className", () => {
  const text = cellClassName(4);
  expect(text).toEqual("cell-4");
});
