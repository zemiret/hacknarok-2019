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
        'SELECT b.id, b.lat, b.lon, b.range, b.capture_time, b.clan_id, b.is_being_captured, b.is_captured, c.color \
        FROM beacons as b \
        LEFT JOIN clans as c on c.id = b.id'
    ).fetchall()

    res = []
    for row in beacons:
        res.append({
            'id': row[0],
            'lat': row[1],
            'lon': row[2],
            'range': row[3],
            'captureTime': row[4],
            'clanId': row[5],
            'is_being_captured': row[6],
            'is_captured': row[7],
            'color': row[8]
        })

    return jsonify(res)


def get_beacon(lat, lon):
    db = get_db()

    beacon = db.execute(
        'SELECT * FROM beacons b WHERE POWER(b.range,2) >= (POWER((b.lat - ?),2)+POWER((b.lon - ?),2))', (lat, lon)
    ).fetchone()

    return beacon
