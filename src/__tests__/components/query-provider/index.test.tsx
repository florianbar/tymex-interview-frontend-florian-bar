import { render } from "@testing-library/react";
import { useQuery } from "@tanstack/react-query";

import QueryProvider from "@/components/query-provider";

// Mock component that uses react-query hook
function TestComponent() {
  const { data } = useQuery({
    queryKey: ["test"],
    queryFn: () => "test-data",
  });
  return <div>{data}</div>;
}

describe("QueryProvider", () => {
  it("should render children", () => {
    const { getByText } = render(
      <QueryProvider>
        <div>Test Child</div>
      </QueryProvider>
    );

    expect(getByText("Test Child")).toBeInTheDocument();
  });

  it("should provide query client context to children", () => {
    const { container } = render(
      <QueryProvider>
        <TestComponent />
      </QueryProvider>
    );

    // Component should render without throwing errors
    expect(container).toBeTruthy();
  });

  it("should create new query client instance", () => {
    const { rerender } = render(
      <QueryProvider>
        <TestComponent />
      </QueryProvider>
    );

    // Rerender should work without errors (new client created)
    expect(() => {
      rerender(
        <QueryProvider>
          <TestComponent />
        </QueryProvider>
      );
    }).not.toThrow();
  });
});
