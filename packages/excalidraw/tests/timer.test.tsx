import { render, screen, act } from "@testing-library/react";
import Timer from "../components/Timer";
import { waitFor } from "@testing-library/react";

test("The Timer component should render without errors", () => {
    render(<Timer />);
    const titleElement = screen.getByText(/Timer/i);
    expect(titleElement).toBeInTheDocument();
});

jest.useFakeTimers();

test("Displays 'Time is up!' when the timer ends", async () => {
    render(<Timer />);
    
    const startButton = screen.getByText(/Start/i);
    act(() => {
      startButton.click();
    });

    act(() => {
        jest.advanceTimersByTime(60000);
    });

    await waitFor(() => expect(screen.getByText(/Time is up!/i)).toBeInTheDocument());
});

test("The timer stops running when reaching zero", async () => {
    render(<Timer />);
    
    const startButton = screen.getByText(/Start/i);
    act(() => {
      startButton.click();
    });

    act(() => {
        jest.advanceTimersByTime(60000);
    });

    await waitFor(() => expect(screen.getByText(/Time is up!/i)).toBeInTheDocument());

    act(() => {
        jest.advanceTimersByTime(10000);
    });
    expect(screen.getByText("00:00")).toBeInTheDocument();
});

test("Clicking the reset button resets the timer to 01:00", async () => {
    render(<Timer />);
    
    const startButton = screen.getByText(/Start/i);
    const resetButton = screen.getByText(/Reset/i);

    act(() => {
      startButton.click();
    });

    act(() => {
        jest.advanceTimersByTime(30000);
    });

    expect(screen.getByText(/00:30/)).toBeInTheDocument();

    act(() => {
        resetButton.click();
    });

    await waitFor(() => expect(screen.getByText(/01:00/)).toBeInTheDocument());
});
