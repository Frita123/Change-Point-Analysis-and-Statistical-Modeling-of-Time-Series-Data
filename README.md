Change Point Analysis and Brent Oil Price Dashboard
Overview

This project analyzes Brent oil prices using a Bayesian change point model and provides an interactive dashboard to explore price trends and major events affecting the market. It covers three main tasks:

Task 1 – Data Preparation and Exploration

Load raw Brent oil prices.

Perform exploratory data analysis (EDA), including line plots of prices and log returns.

Prepare data for modeling.

Task 2 – Bayesian Change Point Modeling

Implement a Bayesian discrete change point model with PyMC.

Detect structural breaks in the price series.

Quantify pre- and post-change mean prices and the percent change.

Compare detected change points with major geopolitical or economic events.

Task 3 – Interactive Dashboard (Flask + React)

Backend (Flask): Provides APIs to serve prices, events, and change point data.

Frontend (React + Recharts): Interactive dashboard visualizing:

Historical price trends.

Bayesian change point (red dashed line).

Major events (orange dots).

Date range filters to zoom into specific periods.

Tooltips showing prices and event details on hover.

Handles API errors gracefully and ensures responsiveness for desktop, tablet, and mobile devices.

Setup Instructions
Backend (Flask)

Navigate to the backend folder:

cd backend


Create and activate a Python virtual environment:

python -m venv .venv
.venv\Scripts\activate      # Windows
source .venv/bin/activate   # Mac/Linux


Install dependencies:

pip install -r requirements.txt


Run the Flask server:

python app.py


Backend APIs:

GET /api/prices → Returns historical prices.

GET /api/events → Returns major oil events.

GET /api/change-point → Returns Bayesian change point results.

Frontend (React)

Navigate to the frontend folder:

cd frontend


Install dependencies:

npm install


Run the development server:

npm start


Features:

Interactive Line Chart for Brent oil prices.

Red dashed line marking the Bayesian change point.

Orange dots representing major events.

Date range filter to zoom in/out.

Hover tooltips displaying price and event information.

Analysis Results (Task 2)

Detected change date: 24-Feb-2005

Mean price before change: $21.51

Mean price after change: $75.52

Estimated change: 251.14%

Likely associated event: ISIS advances in Iraq (15-Jun-2014)

The Bayesian model provides high confidence in detecting structural breaks in oil prices and aligns with real-world events affecting the market.

Improvements and UX Enhancements

Dashboard is fully responsive for desktop, tablet, and mobile.

Added tooltips and legends for better interpretability.

Orange dots indicate major events, with hover text for details.

Red dashed line clearly marks the Bayesian change point.

Date range selector allows users to explore specific periods.

Error handling and logging implemented for API failures.

Project Structure
├── backend
│   ├── app.py           # Flask backend serving APIs
│   ├── requirements.txt # Python dependencies
│   └── ...              # Processed data files
├── frontend
│   ├── src
│   │   ├── App.js       # React dashboard component
│   │   ├── index.js
│   │   └── ... 
│   └── package.json
├── data
│   ├── raw
│   └── processed
└── README.md

Dependencies

Python 3.10+

Flask, Flask-CORS, Pandas, PyMC, ArviZ

Node.js 24+, React 18+, Recharts

How to Use

Start the backend server first (python app.py).

Start the frontend (npm start) and open the browser at http://localhost:3000.

Use the date filters to explore periods of interest.

Hover over the chart to view prices and event details.

Notes

Bayesian change point detection is based on a single-chain MCMC for exploratory purposes.

Orange dots correspond to known events in the oil_events.csv dataset.

The dashboard can be further extended with:

Multiple change point detection.

Event clustering and categorization.

Advanced filtering and drill-down views.