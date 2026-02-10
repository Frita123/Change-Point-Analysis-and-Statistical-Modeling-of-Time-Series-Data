from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
import os

app = Flask(__name__)
CORS(app)

# Paths to your data
PRICES_PATH = "../../data/processed/BrentOilPrices_clean.csv"
EVENTS_PATH = "../../data/oil_events.csv"

# Hardcode Task 2 Bayesian results
CHANGE_POINT_DATE = "2005-02-24"
MU1 = 21.51
MU2 = 75.52
IMPACT = 251.14

def load_csv(path):
    """Load CSV safely with error handling"""
    if not os.path.exists(path):
        return None
    return pd.read_csv(path)

prices = load_csv(PRICES_PATH)
events = load_csv(EVENTS_PATH)

if prices is not None:
    prices["Date"] = pd.to_datetime(prices["Date"])

@app.route("/api/prices")
def get_prices():
    if prices is None:
        return jsonify({"error": "Price data not found"}), 404
    return prices.to_json(orient="records")

@app.route("/api/events")
def get_events():
    if events is None:
        return jsonify({"error": "Events data not found"}), 404
    return events.to_json(orient="records")

@app.route("/api/change-point")
def get_change_point():
    return jsonify({
        "date": CHANGE_POINT_DATE,
        "mu_before": MU1,
        "mu_after": MU2,
        "impact_percent": IMPACT
    })

if __name__ == "__main__":
    app.run(debug=True)
