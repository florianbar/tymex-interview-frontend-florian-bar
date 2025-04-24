import { render, screen } from "@testing-library/react";

import NoUsers from "@/components/no-users";

describe("NoUsers", () => {
  const mockFilterTerm = "test search";

  it("should render the no results message with filter term", () => {
    render(<NoUsers filterTerm={mockFilterTerm} />);

    expect(screen.getByText("No Results Found")).toBeInTheDocument();
    expect(screen.getByText(mockFilterTerm)).toBeInTheDocument();
  });

  it("should display the complete error message", () => {
    render(<NoUsers filterTerm={mockFilterTerm} />);

    expect(
      screen.getByText(/sorry, looks like we didn't find any users matching:/i)
    ).toBeInTheDocument();
  });

  it("should render filter term in bold", () => {
    render(<NoUsers filterTerm={mockFilterTerm} />);

    const boldText = screen.getByText(mockFilterTerm);
    expect(boldText.tagName).toBe("STRONG");
  });
});
