import { render, screen, fireEvent } from "@testing-library/react";
import Search from "@/components/ui/search";

describe("Search", () => {
  const defaultProps = {
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<Search {...defaultProps} />);

    const input = screen.getByPlaceholderText("Search users...");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("");
    expect(input).toHaveAttribute("type", "text");
  });

  it("renders with custom props", () => {
    render(
      <Search
        {...defaultProps}
        type="email"
        initialValue="test@example.com"
        placeholder="Enter email..."
      />
    );

    const input = screen.getByPlaceholderText("Enter email...");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("test@example.com");
    expect(input).toHaveAttribute("type", "email");
  });

  it("calls onChange when input value changes", () => {
    render(<Search {...defaultProps} />);

    const input = screen.getByPlaceholderText("Search users...");
    fireEvent.change(input, { target: { value: "test query" } });

    expect(defaultProps.onChange).toHaveBeenCalledWith("test query");
    expect(input).toHaveValue("test query");
  });

  it("renders search icon", () => {
    render(<Search {...defaultProps} />);

    // Since the icon is from heroicons, we can check for its presence
    // by looking for an SVG element
    const icon = document.querySelector("svg");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass("size-6", "text-gray-400");
  });
});
