import { render, screen } from "@testing-library/react";
import ErrorMessage from "@/components/ui/error-message";

describe("ErrorMessage", () => {
  const defaultProps = {
    title: "Error Title",
    children: "Error message content",
  };

  it("renders the title correctly", () => {
    render(<ErrorMessage {...defaultProps} />);
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
  });

  it("renders the error message content", () => {
    render(<ErrorMessage {...defaultProps} />);
    expect(screen.getByText(defaultProps.children)).toBeInTheDocument();
  });

  it("renders with ReactNode children", () => {
    const props = {
      title: "Error Title",
      children: <div data-testid="custom-error">Custom error content</div>,
    };

    render(<ErrorMessage {...props} />);
    expect(screen.getByTestId("custom-error")).toBeInTheDocument();
    expect(screen.getByText("Custom error content")).toBeInTheDocument();
  });
});
