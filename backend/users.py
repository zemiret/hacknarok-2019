import functools

from flask import (
    Blueprint, flash, g, jsonify,
    request, render_template, url_for, redirect)
from werkzeug.security import generate_password_hash

from backend.beacons import get_beacon
from .db import get_db

bp = Blueprint('users', __name__, url_prefix='/users')


@bp.route('/', methods=(['GET']))
def test_func():
    db = get_db()

    users = db.execute(
        'SELECT * FROM users'
    ).fetchall()

    res = {}
    for row in users:
        res[str(row[0])] = { 'username': row[1],
            'email': row[2],
            'clan_id': row[4],
            'avatar': row[5] or -1,
            'lat': row[6],
            'lon': row[7],
            'beacon_id': row[8] or -1
        }

    return jsonify(res)


@bp.route('/user/<int:user_id>', methods=(['GET']))
def get_user(user_id):
    db = get_db()

    user = get_user_by_id(user_id)

    res = {
        'id': user[0],
        'username': user[1],
        'email': user[2],
        'clan_id': user[4],
        'avatar': user[5] or '',
        'lat': user[6] or 0,
        'lon': user[7] or 0,
        'beacon_id': user[8] or -1
    }
    return jsonify(res)


def get_user_by_id(user_id):
    db = get_db()

    user = db.execute(
        'SELECT * FROM users WHERE id=?',
        (user_id,)
    ).fetchone()

    return user


@bp.route('/start_capture/<int:user_id>', methods=(['POST', 'GET']))
def start_capture(user_id):
    db = get_db()
    msg = None
    user = get_user_by_id(user_id)

    beacon = db.execute(
        'SELECT * FROM beacons b WHERE POWER(b.range,2) >= (POWER((b.lat - ?),2)+POWER((b.lon - ?),2))',
        (user[6], user[7])
    ).fetchone()

    if beacon is None:
        raise RuntimeError("Beacon is none")
    elif beacon[6] != 0:
        raise RuntimeError("Beacon is being captured")
    else:
        db.execute(
            'UPDATE beacons SET is_being_captured = 1'
        )
        db.execute(
            'UPDATE users SET beacon_id = ? WHERE id = ?', (beacon[0], user_id)
        )
        db.commit()
        return jsonify(get_beacon_dict(beacon)) 

@bp.route('/end_capture/<int:user_id>', methods=(['POST']))
def end_capture(user_id):
    db = get_db()
    msg = None

    user = get_user_dict(user_id)
    captured_beacon_id = user['beacon_id']

    if captured_beacon_id is None or captured_beacon_id == -1:
        return "The beacon does not exist"

    beacon = db.execute(
        'SELECT * FROM beacons b WHERE b.id = ?',
        (captured_beacon_id, )
    ).fetchone()

    print(user['clan_id'], captured_beacon_id)

    if beacon is None:
        msg = 'Beacon no exists'
    else:
        db.execute(
            'UPDATE beacons SET is_being_captured = 0, clan_id = ? WHERE id = ?',
            (user['clan_id'], captured_beacon_id)
        )
        db.execute(
            'UPDATE users SET beacon_id = -1 WHERE id = ?', (user_id, )
        )
        db.commit()
        msg = 'Beacon is yours' 

    return msg


@bp.route('/break_capture/<int:user_id>', methods=(['GET']))
def break_capture(user_id):
    db = get_db()
    user = get_user_by_id(user_id)
    error = None
    beacon = db.execute(
        'SELECT * FROM beacons b WHERE POWER(b.range,2) >= (POWER((b.lat - ?),2)+POWER((b.lon - ?),2))',
        (user[6], user[7])
    ).fetchone()

    if beacon is None:
        error = 'Beacon no exists'

    else:
        db.execute(
            'UPDATE beacons SET is_being_captured =0'
        )

        db.commit()
        db.execute(
            'UPDATE users SET beacon_id = 0 WHERE id = ?', (user_id,)
        )
        db.commit()


@bp.route('move/<int:user_id>/<float:lat>/<float:lon>', methods=(['POST']))
def move(user_id, lat, lon):
    db = get_db()
    user = get_user_by_id(user_id)

    if user is not None:
        if user[6] != lat or user[7] != lon:
            set_position(user_id, lat, lon)

            current_user_beacon = get_beacon(lat, lon)

            beacon_belong_to_user = db.execute(
                'SELECT * FROM beacons WHERE id = ?', (user[8],)
            ).fetchone()

            if beacon_belong_to_user is not None:
                if current_user_beacon is not None:
                    if current_user_beacon[0] != beacon_belong_to_user[0]:
                        break_capture(user[0])
                        return 'break'
                else:
                    return 'Out of beacons range'
    return 'move'


#@bp.route('set_position/<int:user_id>/<int:lat>/<int:lon>', methods=(['GET']))
def set_position(user_id, lat, lon):
    db = get_db()

    db.execute(
        'UPDATE users SET lat=?, lon=? WHERE id = ?', (lat, lon, user_id)
    )
    db.commit()

    return "update"

def get_beacon_dict(beacon_row):
    return {
        'id': beacon_row[0],
        'lat': beacon_row[1],
        'lon': beacon_row[2],
        'range': beacon_row[3],
        'capture_time': beacon_row[4],
        'clan_id': beacon_row[5],
        'is_being_captured': beacon_row[6],
    }

def get_user_dict(user_id):
    user = get_user_by_id(user_id)

    return {
        'id': user[0],
        'username': user[1],
        'email': user[2],
        'clan_id': user[4],
        'avatar': user[5] or '',
        'lat': user[6] or 0,
        'lon': user[7] or 0,
        'beacon_id': user[8] or -1
    }

