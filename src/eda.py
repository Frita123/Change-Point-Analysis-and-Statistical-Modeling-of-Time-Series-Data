"""
eda.py
------
Exploratory Data Analysis functions for Brent oil prices
"""

import matplotlib.pyplot as plt
from statsmodels.tsa.stattools import adfuller

def plot_price_trend(df, date_col='Date', price_col='Price'):
    """
    Plot historical Brent oil price trend.
    """
    plt.figure(figsize=(14,5))
    plt.plot(df[date_col], df[price_col], color='blue')
    plt.title("Brent Oil Prices (Historical Trend)")
    plt.xlabel("Date")
    plt.ylabel("Price (USD)")
    plt.grid(True)
    plt.show()

def plot_rolling_volatility(df, date_col='Date', vol_col='volatility'):
    """
    Plot 30-day rolling volatility of returns.
    """
    plt.figure(figsize=(14,4))
    plt.plot(df[date_col], df[vol_col], color='red')
    plt.title("30-Day Rolling Volatility of Brent Oil Returns")
    plt.xlabel("Date")
    plt.ylabel("Volatility")
    plt.grid(True)
    plt.show()

def test_stationarity(series, series_name='Series'):
    """
    Perform Augmented Dickey-Fuller test for stationarity
    """
    adf_result = adfuller(series.dropna())
    print(f"ADF Statistic for {series_name}: {adf_result[0]:.4f}")
    print(f"p-value: {adf_result[1]:.4f}")
    if adf_result[1] < 0.05:
        print(f"{series_name} is stationary (reject H0)\n")
    else:
        print(f"{series_name} is non-stationary (fail to reject H0)\n")
