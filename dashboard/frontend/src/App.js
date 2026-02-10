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
  Scatter
} from "recharts";

function App() {
  const [prices, setPrices] = useState([]);
  const [events, setEvents] = useState([]);

  // Bayesian change point as timestamp
  const changePoint = new Date("2005-02-24").getTime();

  useEffect(() => {
    // Load prices
    fetch("http://127.0.0.1:5000/api/prices")
      .then(res => res.json())
      .then(data => {
        const formatted = data.map(item => ({
          date: new Date(item.Date).getTime(), // numeric timestamp for Recharts
          price: item.Price
        }));
        setPrices(formatted);
      });

    // Load events
    fetch("http://127.0.0.1:5000/api/events")
      .then(res => res.json())
      .then(data => {
        const formattedEvents = data.map(e => ({
          date: new Date(e.date).getTime(), // numeric timestamp
          event: e.event
        }));
        setEvents(formattedEvents);
      });
  }, []);

  // Merge events with price points for scatter
  const eventPoints = prices
    .map(p => {
      const match = events.find(e => e.date === p.date);
      if (match) return { ...p, event: match.event };
      return null;
    })
    .filter(Boolean);

  return (
    <div style={{ padding: 30 }}>
      <h2>Brent Oil Prices Over Time</h2>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={prices}>
          <CartesianGrid strokeDasharray="3 3" />

          {/* X axis with date formatting */}
          <XAxis
            dataKey="date"
            type="number"
            domain={['dataMin', 'dataMax']}
            tickFormatter={tick => new Date(tick).toLocaleDateString()}
          />

          <YAxis />
          <Tooltip labelFormatter={label => new Date(label).toLocaleDateString()} />

          {/* Bayesian Change Point */}
          <ReferenceLine x={changePoint} stroke="red" label="Change Point" />

          {/* Price line */}
          <Line type="monotone" dataKey="price" stroke="#8884d8" dot={false} />

          {/* Event dots */}
          <Scatter data={eventPoints} fill="orange" />
        </LineChart>
      </ResponsiveContainer>

      <p>🟠 Orange dots represent major events</p>
      <p>🔴 Red line represents the Bayesian detected change point</p>
    </div>
  );
}

export default App;
