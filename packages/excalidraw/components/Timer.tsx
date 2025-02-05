import { useState, useEffect } from "react";

export default function Timer() {
  const [timeLeft, setTimeLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) {
      setIsRunning(false);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const handleStart = () => {
    if (timeLeft > 0) {
      setIsRunning(true);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(60);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#333", color: "white", padding: "15px", borderRadius: "12px", width: "150px" }}>
      <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>Timer</h2>
      {!isRunning && (
        <input
          type="number"
          min="1"
          value={minutes}
          onChange={(e) => setTimeLeft(Number(e.target.value) * 60)}
          style={{ color: "black", padding: "8px", borderRadius: "6px", width: "100%", textAlign: "center" }}
        />
      )}
      <p style={{ fontSize: "24px", fontWeight: "bold" }}>
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </p>
      <div style={{ display: "flex", gap: "8px" }}>
        {!isRunning && (
          <button onClick={handleStart} style={{ backgroundColor: "#007bff", color: "white", padding: "8px 16px", borderRadius: "6px", border: "none", cursor: "pointer" }}>
            Start
          </button>
        )}
        <button onClick={handleReset} style={{ backgroundColor: "#dc3545", color: "white", padding: "8px 16px", borderRadius: "6px", border: "none", cursor: "pointer" }}>
          Reset
        </button>
      </div>
      {timeLeft === 0 && <p style={{ color: "red" }}>Time is up!</p>}
    </div>
  );
}
