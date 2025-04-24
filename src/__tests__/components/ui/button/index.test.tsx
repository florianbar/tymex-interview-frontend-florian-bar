import { render, screen, fireEvent } from "@testing-library/react";
import Button, { BUTTON_SIZE } from "@/components/ui/button";

describe("Button", () => {
  it("renders children correctly", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("handles click events", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByText("Click me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies disabled state correctly", () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByRole("button");

    expect(button).toBeDisabled();
    expect(button.className).toContain("opacity-50");
    expect(button.className).not.toContain("cursor-pointer");
  });

  it("applies correct type attribute", () => {
    render(<Button type="submit">Submit</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  });

  describe("size variants", () => {
    it("applies medium size styles by default", () => {
      render(<Button>Default Size</Button>);
      expect(screen.getByRole("button").className).toContain("px-4 py-2.5");
    });

    it("applies large size styles when specified", () => {
      render(<Button size={BUTTON_SIZE.LG}>Large Button</Button>);
      expect(screen.getByRole("button").className).toContain("px-8 py-6");
    });
  });
});
