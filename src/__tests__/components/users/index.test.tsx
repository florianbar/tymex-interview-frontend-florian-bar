import { render, screen } from "@testing-library/react";

import Users from "@/components/users";

describe("Users", () => {
  const mockUsers = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
  ];

  it("should render nothing when users prop is undefined", () => {
    const { container } = render(<Users />);
    expect(container.firstChild).toBeNull();
  });

  it("should render nothing when users array is empty", () => {
    const { container } = render(<Users users={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("should render a list of users", () => {
    render(<Users users={mockUsers} />);

    // Check if users are rendered
    mockUsers.forEach((user) => {
      expect(screen.getByText(user.name)).toBeInTheDocument();
      expect(screen.getByText(user.email)).toBeInTheDocument();
    });
  });

  it("should render correct number of user cards", () => {
    render(<Users users={mockUsers} />);
    const userCards = screen.getAllByRole("listitem");
    expect(userCards).toHaveLength(mockUsers.length);
  });

  it("should render UserImage component for each user", () => {
    render(<Users users={mockUsers} />);
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(mockUsers.length);

    // Check if alt texts are set correctly
    mockUsers.forEach((user) => {
      expect(screen.getByAltText(user.name)).toBeInTheDocument();
    });
  });
});
