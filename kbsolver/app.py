import flask

import solver


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
