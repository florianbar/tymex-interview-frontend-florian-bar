import { renderHook, act } from "@testing-library/react";

import useDebounce from "@/hooks/useDebounce";

describe("useDebounce", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should return the initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("initial value", 500));
    expect(result.current).toBe("initial value");
  });

  it("should update the value after the debounce delay", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "initial value", delay: 500 },
      }
    );

    // Initial value should be set immediately
    expect(result.current).toBe("initial value");

    // Update the value
    rerender({ value: "updated value", delay: 500 });

    // Value should not have changed yet
    expect(result.current).toBe("initial value");

    // Fast-forward time by 500ms
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Now the value should be updated
    expect(result.current).toBe("updated value");
  });

  it("should cancel previous debounce when value changes rapidly", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "initial value", delay: 500 },
      }
    );

    // Update value multiple times
    rerender({ value: "update 1", delay: 500 });
    act(() => {
      jest.advanceTimersByTime(200);
    });

    rerender({ value: "update 2", delay: 500 });
    act(() => {
      jest.advanceTimersByTime(200);
    });

    rerender({ value: "final update", delay: 500 });

    // Value should still be initial
    expect(result.current).toBe("initial value");

    // Fast-forward remaining time
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Should only have the final update
    expect(result.current).toBe("final update");
  });

  it("should work with different delay values", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "initial value", delay: 1000 },
      }
    );

    rerender({ value: "updated value", delay: 1000 });

    // Fast-forward 500ms
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Value should not have changed yet
    expect(result.current).toBe("initial value");

    // Fast-forward remaining time
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Now the value should be updated
    expect(result.current).toBe("updated value");
  });

  it("should handle undefined values", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: undefined, delay: 500 },
      }
    );

    expect(result.current).toBe(undefined);

    rerender({ value: undefined, delay: 500 });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe(undefined);
  });

  it("should handle null values", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: null, delay: 500 },
      }
    );

    expect(result.current).toBe(null);

    rerender({ value: null, delay: 500 });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe(null);
  });
});
