import flask

import sentry_sdk
from sentry_sdk.integrations.flask import FlaskIntegration

import solver

sentry_sdk.init(
    dsn="https://57792b43c338a4841b0266dc4962823a@dsn.frogling.com/4",
    # Set traces_sample_rate to 1.0 to capture 100%
    # of transactions for performance monitoring.
    traces_sample_rate=1.0,
    enable_tracing=True,
    integrations = [
        FlaskIntegration(
            transaction_style="url",
        ),
    ],
)

app = flask.Flask(__name__)

@app.route('/solve', methods=['POST'])
def solve():
    requested_data = flask.request.get_json()

    model = requested_data['model']
    data = requested_data['data']
    obj = requested_data['object']

    result = solver.solve(model, data, obj)

    return result

# debug local
# app.run()
