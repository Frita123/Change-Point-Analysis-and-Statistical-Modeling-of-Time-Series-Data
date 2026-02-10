Change Point Analysis and Statistical Modeling of Brent Oil Prices
Overview

This project analyzes Brent oil prices using time series methods and Bayesian change point detection, then visualizes the results in an interactive dashboard. The workflow spans data preparation, exploratory analysis, Bayesian modeling, and interactive visualization.

Tasks
Task 1: Data Loading & Exploratory Analysis

Loaded Brent oil price data and key event data.

Performed exploratory data analysis:

Plotted raw prices over time to detect trends and shocks.

Calculated log returns to assess volatility clustering.

Key Features:

Visual inspection of price trends.

Identification of high volatility periods.

Basic preprocessing for modeling (log returns, downsampling).

Task 2: Bayesian Change Point Modeling

Applied a Bayesian change point model using PyMC to detect structural breaks.

Modeled a single change point with separate means for pre- and post-regimes.

Estimated posterior distributions for change point and regime means.

Quantified price impacts before and after the detected change point.

Results:

Detected Change Point: ~February 24, 2005

Mean Price Before: $21.51

Mean Price After: $75.52

Estimated Change: 251.14%

Likely Associated Event: ISIS advances in Iraq (June 15, 2014)

Notes & Limitations:

Single-chain MCMC was used for exploratory purposes; convergence diagnostics are limited.

Downsampling was applied to speed up computation.

Event association is approximate; causal inference is not guaranteed.

Sensitivity analysis on priors and data sampling could enhance robustness.

Task 3: Interactive Dashboard

Built a Flask backend + React frontend dashboard to visualize prices, events, and change points.

Features:

Line chart showing Brent oil prices over time.

Change point line marking significant Bayesian-detected structural breaks.

Event visualization: Orange dots represent key historical events affecting prices.

Interactivity: Users can hover over points to view detailed information.

Planned Enhancements (Future Work):

Filters & Date Range Selectors: Allow users to zoom into specific periods or event types.

Tooltip & Drill-down: Show event descriptions and detailed price impacts on hover/click.

Responsive Design: Ensure usability on desktop, tablet, and mobile devices.

Event categorization: Color-code events by type (political, economic, geopolitical).

Sensitivity Analysis: Explore alternative priors, multiple change points, and Markov-switching models.

Project Structure
dashboard/
│
├─ backend/
│   └─ app.py            # Flask API serving prices, events, and change point results
│
├─ frontend/
│   └─ src/
│       └─ App.js        # React dashboard
│
├─ data/
│   ├─ raw/              # Raw Brent prices CSV
│   ├─ processed/        # Cleaned and preprocessed CSVs
│   └─ oil_events.csv    # Historical events affecting oil prices

Setup Instructions
Backend
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python app.py


Runs Flask API on http://127.0.0.1:5000.

Frontend
cd frontend
npm install
npm start


Opens React dashboard on http://localhost:3000.

Key Learnings

Bayesian change point models can detect regime shifts in time series data.

Historical events can explain sudden structural breaks in commodity prices.

Interactive dashboards provide stakeholders a clear, visual understanding of data and analysis results.

Future Improvements

Implement multi-chain MCMC and multiple change points.

Add more explanatory variables (GDP, inflation, exchange rates) to enrich modeling.

Enhance dashboard interactivity with filters, drill-down, and responsive design.

Perform comprehensive sensitivity analysis to strengthen insights.