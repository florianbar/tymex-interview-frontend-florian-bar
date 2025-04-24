import { getRandomUserImage } from "@/utils/images";

describe("getRandomUserImage", () => {
  beforeEach(() => {
    // Reset Math.random to its original implementation before each test
    jest.spyOn(Math, "random").mockRestore();
  });

  it("should return a valid image path", () => {
    const imagePath = getRandomUserImage();
    expect(imagePath).toMatch(/^\/images\/users\/.+\.png$/);
  });

  it("should return one of the predefined user images", () => {
    const validImages = [
      "/images/users/assassin.png",
      "/images/users/basketball-girl.png",
      "/images/users/mafia-england.png",
      "/images/users/neon-guy.png",
      "/images/users/the-dj.png",
    ];

    const imagePath = getRandomUserImage();
    expect(validImages).toContain(imagePath);
  });

  it("should return different images based on random selection", () => {
    // Mock Math.random to return specific values
    const mockMath = jest.spyOn(Math, "random");

    mockMath.mockReturnValueOnce(0); // First call returns first image
    expect(getRandomUserImage()).toBe("/images/users/assassin.png");

    mockMath.mockReturnValueOnce(0.2); // Second call returns second image
    expect(getRandomUserImage()).toBe("/images/users/basketball-girl.png");

    mockMath.mockReturnValueOnce(0.6); // Third call returns fourth image
    expect(getRandomUserImage()).toBe("/images/users/neon-guy.png");
  });

  it("should handle edge cases of Math.random", () => {
    const mockMath = jest.spyOn(Math, "random");

    // Test with 0 (first image)
    mockMath.mockReturnValueOnce(0);
    expect(getRandomUserImage()).toBe("/images/users/assassin.png");

    // Test with 0.99 (last image)
    mockMath.mockReturnValueOnce(0.99);
    expect(getRandomUserImage()).toBe("/images/users/the-dj.png");
  });
});
