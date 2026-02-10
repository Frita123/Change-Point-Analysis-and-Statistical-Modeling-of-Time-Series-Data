from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load datasets
prices = pd.read_csv("../../data/processed/BrentOilPrices_clean.csv")
events = pd.read_csv("../../data/oil_events.csv")

prices["Date"] = pd.to_datetime(prices["Date"])

# Hardcode Task 2 results (from your Bayesian model)
CHANGE_POINT_DATE = "2005-02-24"
MU1 = 21.51
MU2 = 75.52
IMPACT = 251.14

@app.route("/api/prices")
def get_prices():
    return prices.to_json(orient="records")

@app.route("/api/events")
def get_events():
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
