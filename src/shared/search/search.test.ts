import { describe, it, expect } from "vitest";
import { luceneSearch } from "./search";

const data = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 22 },
];

describe("luceneFilter", () => {
  it("filters implicitly", () => {
    const result = luceneSearch("ali", data, "name");
    expect(result).toEqual([{ name: "Alice", age: 25 }]);
  });

  it("filters implicitly not", () => {
    const result = luceneSearch("!'Alice'", data, "name");
    expect(result).toEqual([
      { name: "Bob", age: 30 },
      { name: "Charlie", age: 22 },
    ]);
  });

  it("filters exactly", () => {
    const result = luceneSearch("'Alice'", data, "name");
    expect(result).toEqual([{ name: "Alice", age: 25 }]);
  });

  it("filters exactly not", () => {
    const result = luceneSearch("!'Alice'", data, "name");
    expect(result).toEqual([
      { name: "Bob", age: 30 },
      { name: "Charlie", age: 22 },
    ]);
  });

  it("filters implicitly and exactly not", () => {
    const result = luceneSearch("a AND !'Alice'", data, "name");
    expect(result).toEqual([{ name: "Charlie", age: 22 }]);
  });

  it("filters implicitly and implicitly not", () => {
    const result = luceneSearch("a AND !alice", data, "name");
    expect(result).toEqual([{ name: "Charlie", age: 22 }]);
  });

  it("filters objects by a numeric field with '>' operator", () => {
    const result = luceneSearch("age:>23", data);
    expect(result).toEqual([
      { name: "Alice", age: 25 },
      { name: "Bob", age: 30 },
    ]);
  });

  it("filters objects by an exact textual field", () => {
    const result = luceneSearch("name:Bob", data);
    expect(result).toEqual([{ name: "Bob", age: 30 }]);
  });

  it("filters objects by a partial textual field", () => {
    const result = luceneSearch("name:Ali", data);
    expect(result).toEqual([{ name: "Alice", age: 25 }]);
  });

  it("filters objects by an AND combination", () => {
    const result = luceneSearch("name:Alice AND age:<30", data);
    expect(result).toEqual([{ name: "Alice", age: 25 }]);
  });

  it("filters objects by an OR combination", () => {
    const result = luceneSearch("age:<23 OR name:Bob", data);
    expect(result).toEqual([
      { name: "Bob", age: 30 },
      { name: "Charlie", age: 22 },
    ]);
  });

  it("returns an empty array if no elements match", () => {
    const result = luceneSearch("age:>50", data);
    expect(result).toEqual([]);
  });

  it("returns an empty array if elements not equals", () => {
    const result = luceneSearch("age:!50", data);
    expect(result).toEqual([
      { name: "Alice", age: 25 },
      { name: "Bob", age: 30 },
      { name: "Charlie", age: 22 },
    ]);
  });

  it("ignores non-existent fields", () => {
    const result = luceneSearch("height:>100", data);
    expect(result).toEqual([]);
  });
});
