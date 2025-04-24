import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import Home from "@/app/page";
import { SEARCH_CATEGORY } from "@/constants/users";

// Mock the tanstack query hook
jest.mock("@tanstack/react-query", () => ({
  useInfiniteQuery: jest.fn(),
}));

// Mock the debounce hook to return the value immediately
jest.mock("@/hooks/useDebounce", () => (value: string) => value);

describe("Home", () => {
  const mockUsers = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
  ];

  const defaultQueryResponse = {
    data: {
      pages: [mockUsers],
      pageParams: [1],
    },
    fetchNextPage: jest.fn(),
    hasNextPage: true,
    isFetchingNextPage: false,
    isPending: false,
    isError: false,
    error: null,
  };

  beforeEach(() => {
    (useInfiniteQuery as jest.Mock).mockReturnValue(defaultQueryResponse);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the filter section", () => {
    render(<Home />);

    expect(screen.getByText("Filter")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search users...")).toBeInTheDocument();
    expect(screen.getByText("Filter by")).toBeInTheDocument();

    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();
    expect(select).toHaveValue(SEARCH_CATEGORY.NAME);
  });

  it("renders the results section with users", () => {
    render(<Home />);

    expect(screen.getByText("Results")).toBeInTheDocument();
    mockUsers.forEach((user) => {
      expect(screen.getByText(user.name)).toBeInTheDocument();
      expect(screen.getByText(user.email)).toBeInTheDocument();
    });
  });

  it("shows loading state", () => {
    (useInfiniteQuery as jest.Mock).mockReturnValue({
      ...defaultQueryResponse,
      isPending: true,
    });

    render(<Home />);
    expect(screen.getByText("Loading Users")).toBeInTheDocument();
  });

  it("shows error message when query fails", () => {
    const errorMessage = "Failed to fetch users";
    (useInfiniteQuery as jest.Mock).mockReturnValue({
      ...defaultQueryResponse,
      isError: true,
      error: { message: errorMessage },
    });

    render(<Home />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it("shows no users message when filter returns empty results", () => {
    (useInfiniteQuery as jest.Mock).mockReturnValue({
      ...defaultQueryResponse,
      data: { pages: [[]], pageParams: [1] },
    });

    render(<Home />);

    const searchInput = screen.getByPlaceholderText("Search users...");
    fireEvent.change(searchInput, { target: { value: "nonexistent" } });

    expect(screen.getByText(/No Results Found/i)).toBeInTheDocument();
  });

  it("handles filter type change", async () => {
    render(<Home />);

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: SEARCH_CATEGORY.EMAIL } });

    await waitFor(() => {
      expect(select).toHaveValue(SEARCH_CATEGORY.EMAIL);
    });
  });

  it("handles load more button click", () => {
    render(<Home />);

    const loadMoreButton = screen.getByText("Load more");
    fireEvent.click(loadMoreButton);

    expect(defaultQueryResponse.fetchNextPage).toHaveBeenCalledTimes(1);
  });

  it("shows loading state when fetching next page", () => {
    (useInfiniteQuery as jest.Mock).mockReturnValue({
      ...defaultQueryResponse,
      isFetchingNextPage: true,
    });

    render(<Home />);

    expect(screen.getByText("Loading more...")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("hides load more button when there are no more pages", () => {
    (useInfiniteQuery as jest.Mock).mockReturnValue({
      ...defaultQueryResponse,
      hasNextPage: false,
    });

    render(<Home />);

    expect(screen.queryByText("Load more")).not.toBeInTheDocument();
  });
});
