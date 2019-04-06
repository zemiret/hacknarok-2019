import functools

from flask import (
    Blueprint, flash, g, jsonify
)

from .db import get_db

bp = Blueprint('beacons', __name__, url_prefix='/beacons')

@bp.route('/', methods=(['GET']))
def test_func():
    db = get_db()

    beacons = db.execute(
        'SELECT b.id, b.lat, b.lon, b.range, b.capture_time, b.clan_id, c.color \
        FROM beacons as b \
        LEFT JOIN clan as c on c.id = b.id'
    ).fetchall()

    print(beacons)

    res = {}
    for row in beacons:
        res[str(row[0])] = {
            'lat': row[1],
            'lon': row[2],
            'range': row[3],
            'captureTime': row[4],
            'clanId': row[5],
            'color': row[6]
        }

    return jsonify(res)

