"""
load_data.py
------------
Functions to load and preprocess Brent oil prices and event datasets.
"""

import pandas as pd
from pathlib import Path

def load_brent_prices(file_path: str) -> pd.DataFrame:
    """
    Load and preprocess Brent oil prices CSV.
    
    Args:
        file_path (str): Path to BrentOilPrices CSV
    
    Returns:
        pd.DataFrame: Cleaned dataframe with Date as datetime, sorted
    """
    df = pd.read_csv(file_path)
    df['Date'] = pd.to_datetime(df['Date'])
    df = df.sort_values('Date').reset_index(drop=True)
    
    # Calculate daily returns
    df['returns'] = df['Price'].pct_change()
    
    # Calculate 30-day rolling volatility
    df['volatility'] = df['returns'].rolling(30).std()
    
    return df

def load_oil_events(file_path: str) -> pd.DataFrame:
    """
    Load oil events CSV.
    
    Args:
        file_path (str): Path to oil_events CSV
    
    Returns:
        pd.DataFrame: Events dataframe with datetime index
    """
    events = pd.read_csv(file_path)
    events['date'] = pd.to_datetime(events['date'])
    events = events.sort_values('date').reset_index(drop=True)
    return events
