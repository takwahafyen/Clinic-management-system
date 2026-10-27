import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { ToastProvider, useToast } from "./ToastContext";

const TestComponent = () => {
  const { showToast } = useToast();
  return (
    <div>
      <button onClick={() => showToast("Success notification!", "success")}>
        Trigger Success
      </button>
      <button onClick={() => showToast("Error alert!", "error", 1000)}>
        Trigger Error
      </button>
    </div>
  );
};

describe("ToastContext & ToastContainer", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("displays a toast when showToast is called", () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText("Trigger Success"));

    expect(screen.getByText("Success notification!")).toBeInTheDocument();
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("dismisses a toast when clicking the close button", () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText("Trigger Success"));
    expect(screen.getByText("Success notification!")).toBeInTheDocument();

    const closeBtn = screen.getByLabelText("Close notification");
    fireEvent.click(closeBtn);

    expect(screen.queryByText("Success notification!")).not.toBeInTheDocument();
  });

  it("automatically dismisses after specified duration", () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText("Trigger Error"));
    expect(screen.getByText("Error alert!")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(1100);
    });

    expect(screen.queryByText("Error alert!")).not.toBeInTheDocument();
  });
});
