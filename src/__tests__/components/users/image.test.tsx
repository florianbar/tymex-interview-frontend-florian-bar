import { render, screen } from "@testing-library/react";

import UserImage from "@/components/users/image";
import { getRandomUserImage, getRandomImageColor } from "@/utils/images";

// Mock the images utility functions
jest.mock("@/utils/images", () => ({
  getRandomUserImage: jest.fn(),
  getRandomImageColor: jest.fn(),
}));

describe("UserImage", () => {
  const mockAlt = "Test User";

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    // Set default mock return values
    (getRandomUserImage as jest.Mock).mockReturnValue(
      "/images/users/assassin.png"
    );
    (getRandomImageColor as jest.Mock).mockReturnValue("purple");
  });

  it("should render with the provided alt text", () => {
    render(<UserImage alt={mockAlt} />);
    expect(screen.getByAltText(mockAlt)).toBeInTheDocument();
  });

  it("should call getRandomUserImage and getRandomImageColor once during initialization", () => {
    render(<UserImage alt={mockAlt} />);
    expect(getRandomUserImage).toHaveBeenCalledTimes(1);
    expect(getRandomImageColor).toHaveBeenCalledTimes(1);
  });

  describe("gradient styles", () => {
    it.each([
      ["purple", "from-[var(--tymex-purple-1)] to-[var(--tymex-purple-2)]"],
      ["green", "from-[var(--tymex-green-1)] to-[var(--tymex-green-2)]"],
      ["yellow", "from-[var(--tymex-yellow-1)] to-[var(--tymex-yellow-2)]"],
      ["red", "from-[var(--tymex-red-1)] to-[var(--tymex-red-2)]"],
      ["blue", "from-[var(--tymex-blue-1)] to-[var(--tymex-blue-2)]"],
    ])(
      "should apply correct gradient for %s color",
      (color, expectedGradient) => {
        (getRandomImageColor as jest.Mock).mockReturnValue(color);
        const { container } = render(<UserImage alt={mockAlt} />);

        const wrapper = container.firstChild as HTMLElement;
        expect(wrapper.className).toContain("bg-gradient-to-r");
        expect(wrapper.className).toContain(expectedGradient);
      }
    );

    it("should apply blue gradient as default for unknown colors", () => {
      (getRandomImageColor as jest.Mock).mockReturnValue("invalid-color");
      const { container } = render(<UserImage alt={mockAlt} />);

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.className).toContain(
        "from-[var(--tymex-blue-1)] to-[var(--tymex-blue-2)]"
      );
    });
  });

  it("should render image with correct dimensions", () => {
    render(<UserImage alt={mockAlt} />);
    const image = screen.getByAltText(mockAlt);

    expect(image).toHaveAttribute("width", "235");
    expect(image).toHaveAttribute("height", "197");
  });

  it("should render wrapper with correct dimensions and styling", () => {
    const { container } = render(<UserImage alt={mockAlt} />);
    const wrapper = container.firstChild as HTMLElement;

    expect(wrapper.className).toContain("w-full");
    expect(wrapper.className).toContain("h-[233px]");
    expect(wrapper.className).toContain("rounded-sm");
    expect(wrapper.className).toContain("relative");
  });
});
