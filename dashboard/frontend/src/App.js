import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Scatter,
  Legend
} from "recharts";

function App() {
  const [prices, setPrices] = useState([]);
  const [events, setEvents] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const CHANGE_POINT = "2/24/2005"; // US format

  useEffect(() => {
    // Load prices
    fetch("http://127.0.0.1:5000/api/prices")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((item) => ({
          date: new Date(item.Date).toLocaleDateString(),
          price: item.Price,
        }));
        setPrices(formatted);
        // Set default date filter
        setStartDate(formatted[0].date);
        setEndDate(formatted[formatted.length - 1].date);
      })
      .catch((err) => console.error("Failed to load prices:", err));

    // Load events
    fetch("http://127.0.0.1:5000/api/events")
      .then((res) => res.json())
      .then((data) => {
        const formattedEvents = data.map((e) => ({
          date: new Date(e.date).toLocaleDateString(),
          event: e.event,
        }));
        setEvents(formattedEvents);
      })
      .catch((err) => console.error("Failed to load events:", err));
  }, []);

  // Filter data by date range
  const filteredPrices = prices.filter(
    (p) => p.date >= startDate && p.date <= endDate
  );

  // Merge events with price points
  const eventPoints = filteredPrices
    .map((p) => {
      const match = events.find((e) => e.date === p.date);
      if (match) return { ...p, event: match.event };
      return null;
    })
    .filter(Boolean);

  return (
    <div style={{ padding: 30 }}>
      <h2>Brent Oil Prices Over Time</h2>

      {/* Date range filters */}
      <div style={{ marginBottom: 20 }}>
        <label>
          Start Date:{" "}
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label style={{ marginLeft: 20 }}>
          End Date:{" "}
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
      </div>

      <ResponsiveContainer width="100%" height={500}>
        <LineChart data={filteredPrices}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" hide />
          <YAxis />
          <Tooltip
            formatter={(value, name, props) => [`$${value}`, "Price"]}
            labelFormatter={(label) => `Date: ${label}`}
          />
          <Legend />

          {/* Change point line */}
          <ReferenceLine
            x={CHANGE_POINT}
            stroke="red"
            strokeDasharray="5 5"
            label={{ value: "Change Point", position: "top", fill: "red" }}
          />

          {/* Price line */}
          <Line type="monotone" dataKey="price" stroke="#8884d8" dot={false} />

          {/* Event dots */}
          <Scatter
            data={eventPoints}
            fill="orange"
            shape="circle"
            legendType="circle"
          />
        </LineChart>
      </ResponsiveContainer>

      <p>🟠 Orange dots represent major events</p>
    </div>
  );
}

export default App;
