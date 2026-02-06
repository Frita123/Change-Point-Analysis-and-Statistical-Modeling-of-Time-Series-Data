# Task 1: Laying the Foundation for Analysis
## Change Point Analysis of Brent Oil Prices

---

## 1. Introduction

Brent crude oil prices are highly sensitive to geopolitical events, economic shocks, and policy decisions by major oil-producing countries. Understanding how these events affect price behavior is critical for investors, policymakers, and energy companies.

This analysis focuses on identifying structural breaks in Brent oil prices using Bayesian change point modeling and relating them to significant events in the global energy market.

---

## 2. Data Analysis Workflow

The analysis follows a structured workflow:

**Step 1: Data Loading and Cleaning**
- Load historical Brent oil prices from `BrentOilPrices.csv`.
- Convert date columns to datetime format and sort chronologically.
- Handle missing or invalid values.

**Step 2: Exploratory Data Analysis (EDA)**
- Visualize historical price trends.
- Compute daily returns.
- Analyze rolling volatility.
- Perform stationarity testing (ADF test).

**Step 3: Event Dataset Compilation**
- Research major geopolitical, economic, and OPEC-related events.
- Create a structured dataset with event dates and descriptions.

**Step 4: Bayesian Change Point Modeling**
- Apply Bayesian change point detection using PyMC.
- Identify dates of statistical shifts in oil prices.
- Estimate mean prices before and after change points.

**Step 5: Event Mapping and Interpretation**
- Compare detected change points with documented events.
- Quantify price shifts and analyze correlations.

**Step 6: Insight Generation and Visualization**
- Summarize findings in the report.
- Develop an interactive Streamlit dashboard for stakeholders.

---

## 3. Event Dataset

A structured dataset of major oil market events has been compiled (`oil_events.csv`) including:

- OPEC production decisions  
- Conflicts in oil-producing regions  
- Economic sanctions  
- Global shocks such as pandemics  

This dataset will be used to map change points to events for interpretation.

---

## 4. Assumptions and Limitations

**Assumptions**
- Brent prices respond measurably to major geopolitical and economic events.
- Detected change points represent significant market shifts.
- Daily price data captures market reactions effectively.

**Limitations**
- Correlation does not imply causation.
- Markets may anticipate events, causing pre-event price changes.
- Multiple overlapping events may influence prices simultaneously.
- Other factors such as currency fluctuations, demand changes, or speculation are not modeled.

---

## 5. Communication Channels

Results will be communicated through:

- Technical written report
- Interactive Streamlit dashboard
- Jupyter notebooks for reproducibility
- Executive summary slides for stakeholders

---

## 6. Time Series Properties of Brent Oil Prices

**Trend Analysis**  
Long-term trends and sharp price fluctuations correspond to crises and major geopolitical events.

**Stationarity Testing**  
ADF tests show that raw prices are non-stationary, while daily returns are stationary — justifying change point analysis.

**Volatility Patterns**  
Rolling volatility analysis reveals clustering during periods of stress (e.g., COVID-19, oil price wars), indicating regime shifts.

These insights inform modeling choices for Bayesian change point detection.

---

## 7. Change Point Models

Change point models identify points in time where statistical properties of a time series change significantly. Bayesian methods provide:

- Probable change point dates
- Mean prices before and after shifts
- Uncertainty estimates

This framework allows detection of structural breaks while accounting for model uncertainty.

---

## 8. Expected Outputs

- Estimated change point dates
- Mean price levels before and after each change
- Posterior distributions of model parameters
- Visualizations of detected structural breaks

**Limitations:** Models assume abrupt changes rather than gradual transitions and focus primarily on mean shifts rather than volatility.

---

## 9. Conclusion

This document establishes the foundation for analyzing Brent oil prices using Bayesian change point detection. The methodology enables data-driven interpretation of market behavior in response to global events, supporting informed decision-making for energy sector stakeholders.
