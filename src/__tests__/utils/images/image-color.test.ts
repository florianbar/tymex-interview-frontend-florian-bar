import { getRandomImageColor } from "@/utils/images";

describe("getRandomImageColor", () => {
  beforeEach(() => {
    // Reset Math.random to its original implementation before each test
    jest.spyOn(Math, "random").mockRestore();
  });

  it("should return a valid color string", () => {
    const color = getRandomImageColor();
    expect(typeof color).toBe("string");
    expect(color.length).toBeGreaterThan(0);
  });

  it("should return one of the predefined colors", () => {
    const validColors = ["purple", "green", "yellow", "red", "blue"];

    const color = getRandomImageColor();
    expect(validColors).toContain(color);
  });

  it("should return different colors based on random selection", () => {
    // Mock Math.random to return specific values
    const mockMath = jest.spyOn(Math, "random");

    mockMath.mockReturnValueOnce(0); // First call returns first color
    expect(getRandomImageColor()).toBe("purple");

    mockMath.mockReturnValueOnce(0.2); // Second call returns second color
    expect(getRandomImageColor()).toBe("green");

    mockMath.mockReturnValueOnce(0.6); // Third call returns fourth color
    expect(getRandomImageColor()).toBe("red");
  });

  it("should handle edge cases of Math.random", () => {
    const mockMath = jest.spyOn(Math, "random");

    // Test with 0 (first color)
    mockMath.mockReturnValueOnce(0);
    expect(getRandomImageColor()).toBe("purple");

    // Test with 0.99 (last color)
    mockMath.mockReturnValueOnce(0.99);
    expect(getRandomImageColor()).toBe("blue");
  });
});
