from src.load_data import load_brent_prices, load_oil_events
from src.eda import plot_price_trend, plot_rolling_volatility, test_stationarity

# Load datasets
df_prices = load_brent_prices("data/raw/BrentOilPrices.csv")
df_events = load_oil_events("data/oil_events.csv")

# EDA functions
plot_price_trend(df_prices)
plot_rolling_volatility(df_prices)
test_stationarity(df_prices['returns'], 'Daily Returns')
