import pandas as pd
from pathlib import Path


def load_price_data(filepath):
    try:
        path = Path(filepath)

        if not path.exists():
            raise FileNotFoundError(f"File not found: {filepath}")

        df = pd.read_csv(filepath)

        required_cols = ["Date", "Price"]
        for col in required_cols:
            if col not in df.columns:
                raise ValueError(f"Missing required column: {col}")

        df["Date"] = pd.to_datetime(df["Date"], errors="coerce")

        if df["Date"].isnull().any():
            raise ValueError("Some dates could not be parsed.")

        return df

    except Exception as e:
        print("Error loading price data:", e)
        return None
