from load_data import load_price_data

filepath = "data/brent_prices.csv"

df = load_price_data(filepath)

if df is None:
    print("EDA stopped due to data loading error.")
    exit()

print(df.describe())
