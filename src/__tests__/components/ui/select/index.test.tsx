import { render, screen, fireEvent } from "@testing-library/react";
import Select from "@/components/ui/select";

describe("Select", () => {
  const defaultProps = {
    options: [
      { label: "Option 1", value: "1" },
      { label: "Option 2", value: "2" },
      { label: "Option 3", value: "3" },
    ],
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders with placeholder", () => {
    render(<Select {...defaultProps} placeholder="Select an option" />);

    const placeholder = screen.getByText("Select an option");
    expect(placeholder).toBeInTheDocument();
    expect(placeholder.tagName).toBe("OPTION");
    expect(placeholder).toBeDisabled();
  });

  it("renders all options", () => {
    render(<Select {...defaultProps} />);

    defaultProps.options.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it("sets initial value correctly", () => {
    render(<Select {...defaultProps} value="2" />);

    const select = screen.getByRole("combobox");
    expect(select).toHaveValue("2");
  });

  it("calls onChange when selection changes", () => {
    render(<Select {...defaultProps} />);

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "2" } });

    expect(defaultProps.onChange).toHaveBeenCalledWith("2");
  });

  it("updates internal state when selection changes", () => {
    render(<Select {...defaultProps} />);

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "3" } });

    expect(select).toHaveValue("3");
  });
});
