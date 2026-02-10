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
  const [error, setError] = useState("");

  const [dateRange, setDateRange] = useState([null, null]); // [start, end]
  const [selectedEvent, setSelectedEvent] = useState("All");

  const changePoint = "2/24/2005"; // US date format

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch prices
        const pricesRes = await fetch("http://127.0.0.1:5000/api/prices");
        if (!pricesRes.ok) throw new Error("Failed to fetch prices");
        const pricesData = await pricesRes.json();
        const formattedPrices = pricesData.map(item => ({
          date: new Date(item.Date),
          price: item.Price
        }));
        setPrices(formattedPrices);

        // Fetch events
        const eventsRes = await fetch("http://127.0.0.1:5000/api/events");
        if (!eventsRes.ok) throw new Error("Failed to fetch events");
        const eventsData = await eventsRes.json();
        const formattedEvents = eventsData.map(e => ({
          date: new Date(e.date),
          event: e.event
        }));
        setEvents(formattedEvents);

      } catch (err) {
        setError(err.message);
      }
    }

    fetchData();
  }, []);

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  // Filter prices by date range
  const filteredPrices = prices.filter(p => {
    const startOk = !dateRange[0] || p.date >= dateRange[0];
    const endOk = !dateRange[1] || p.date <= dateRange[1];
    return startOk && endOk;
  });

  // Filter events by date and type
  const filteredEvents = events.filter(e => {
    const inRange = (!dateRange[0] || e.date >= dateRange[0]) && (!dateRange[1] || e.date <= dateRange[1]);
    const typeMatch = selectedEvent === "All" || e.event === selectedEvent;
    return inRange && typeMatch;
  });

  // Match events with price points
  const eventPoints = filteredPrices
    .map(p => {
      const match = filteredEvents.find(e => e.date.toDateString() === p.date.toDateString());
      if (match) return { ...p, event: match.event };
      return null;
    })
    .filter(Boolean);

  // Unique event types for dropdown
  const eventTypes = ["All", ...Array.from(new Set(events.map(e => e.event)))];

  // Custom tooltip to show event name
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const priceData = payload.find(p => p.dataKey === "price");
      const eventData = payload.find(p => p.dataKey === "event");
      return (
        <div style={{ backgroundColor: "white", border: "1px solid #ccc", padding: 10 }}>
          <p>{label.toLocaleDateString()}</p>
          {priceData && <p>Price: ${priceData.value}</p>}
          {eventData && <p>Event: {eventData.value}</p>}
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>Brent Oil Prices Over Time</h2>

      <div style={{ marginBottom: 20 }}>
        <label>
          Start Date:{" "}
          <input
            type="date"
            onChange={e => setDateRange([new Date(e.target.value), dateRange[1]])}
          />
        </label>
        &nbsp;&nbsp;
        <label>
          End Date:{" "}
          <input
            type="date"
            onChange={e => setDateRange([dateRange[0], new Date(e.target.value)])}
          />
        </label>
        &nbsp;&nbsp;
        <label>
          Event Type:{" "}
          <select onChange={e => setSelectedEvent(e.target.value)}>
            {eventTypes.map(ev => <option key={ev} value={ev}>{ev}</option>)}
          </select>
        </label>
      </div>

      <ResponsiveContainer width="100%" height={500}>
        <LineChart data={filteredPrices}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tickFormatter={date => date.toLocaleDateString()} />
          <YAxis />
          <Tooltip content={CustomTooltip} />

          {/* Legend */}
          <Legend />

          {/* Change point */}
          <ReferenceLine
            x={new Date(changePoint)}
            stroke="red"
            label="Change Point"
          />

          {/* Price line */}
          <Line type="monotone" dataKey="price" stroke="#8884d8" dot={false} />

          {/* Event dots */}
          <Scatter
            data={eventPoints}
            dataKey="event"
            fill="orange"
          />
        </LineChart>
      </ResponsiveContainer>

      <p>🟠 Orange dots represent major events</p>
    </div>
  );
}

export default App;
