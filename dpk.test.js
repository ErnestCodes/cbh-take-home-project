const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("returns '0' with no input", () => {
    expect(deterministicPartitionKey()).toBe("0");
  });

  it("returns '0' with null input", () => {
    expect(deterministicPartitionKey(null)).toBe("0");
  });

  it("returns the same output for the same input", () => {
    const input = "ClipboardHealth";
    expect(deterministicPartitionKey(input)).toBe(
      deterministicPartitionKey(input)
    );
  });

  it("returns the partitionKey property of the input as-is if it's <= 256 characters", () => {
    const expected = "ClipboardHealth";
    const input = { partitionKey: expected };
    expect(deterministicPartitionKey(input)).toBe(expected);
  });

  it("returns the hashed partitionKey property if it's > 256 characters", () => {
    const longKey = `
      80078007666888c3118941637ce945863630badcdd51cb3ef69fd076f17e7e629fb944b
      7d9c36748ff20b5cd8585409e85a9e4d306d9b0b93f2757d33cbc8c6f17e7e629fb944b
      a367666888c3118941637ce945863630badcdd51cb3ef69fd077d9c36748ff20b5cd858
      09e85a9e4d306d9b0b93f2757d33cbc8c6f17e7e629fb944b99a3678007666888c31189
      637ce945863630badcdd51cb3ef69fd077d9c36748ff20b5cd8585409e85a9e4d306d9b
      93f2757d33cbc8c6f17e7e629fb944b99a367d51cb3ef69fd077d9c36748ff20b5cd858
    `;
    const input = { partitionKey: longKey };
    expect(deterministicPartitionKey(input).length).toBeLessThanOrEqual(256);
  });
});
