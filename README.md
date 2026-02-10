Change Point Analysis and Dashboard for Brent Oil Prices
Overview

This project performs a time series analysis of Brent oil prices and builds an interactive dashboard to visualize the results. The analysis detects structural breaks in the data using Bayesian change point modeling, quantifies the impact of major events, and allows stakeholders to explore price trends interactively.

Tasks Covered:

Task 1: Time series analysis and visualization of Brent oil prices.

Task 2: Bayesian change point detection and insight generation.

Task 3: Interactive dashboard for visualization of price trends, change points, and events.

Task 1 – Time Series Analysis

Loaded Brent oil price data and visualized historical trends.

Calculated log returns to analyze volatility clustering.

Explored seasonality and price shocks using plots.

Key Libraries:

pandas, numpy, matplotlib, seaborn

Task 2 – Bayesian Change Point Modeling

Applied a Bayesian discrete change point model using PyMC.

Detected structural breaks in Brent oil prices.

Quantified the impact of major events:

Example Output:

Detected change point: 2005-02-24

Mean price before: $21.51

Mean price after: $75.52

Estimated change: ~251%

Likely associated event: ISIS advances in Iraq (2014-06-15)

Key Libraries:

pymc, arviz, pandas, numpy, matplotlib

Insights:

The analysis indicates that geopolitical instability and supply shocks significantly impact oil price regimes. The Bayesian model gives a probabilistic estimate of when and how prices shifted.

Task 3 – Interactive Dashboard

The dashboard visualizes:

Brent oil price trends over time

Bayesian change point (red line)

Major events (orange dots)

Tooltips with date and event information

Backend (Flask):

Provides API endpoints:

Endpoint	Description
/api/prices	Historical Brent oil prices
/api/events	Major events affecting oil prices
/api/change-point	Task 2 Bayesian change point results
Frontend (React):

Built using React and Recharts

Features:

Interactive line chart for prices

Red reference line for Bayesian change point

Orange dots for major events

Tooltip shows date and price/event

Responsive design for desktop and mobile

Usage

Open browser at http://localhost:3000.

Interact with the line chart:

Blue line → Brent oil prices

Red line → Bayesian change point

Orange dots → Major events (hover to see details)

Notes

The React app fetches live data from Flask backend.

The Bayesian change point is hardcoded from Task 2 results.

For large datasets, consider downsampling to improve dashboard performance.