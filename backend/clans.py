import functools

from flask import (
    Blueprint, flash, g, jsonify,
    request, url_for, render_template, redirect)

from backend.auth import login_required
from .db import get_db

bp = Blueprint('clans', __name__, url_prefix='/clans')


@bp.route('/', methods=(['GET']))
def test_func():
    db = get_db()

    clans = db.execute(
        'SELECT * FROM clans'
    ).fetchall()

    res = {}
    for row in clans:
        res[str(row[0])] = {
            'name': row[1],
            'color': row[2],
            'avatar': row[3] or -1
        }

    return jsonify(res)


@bp.route('/users/<int:clan_id>', methods=(['GET']))
def get_users_in_clan(clan_id):
    db = get_db()

    users = db.execute(
        'SELECT * FROM users WHERE clan_id=?',
        (clan_id,)
    ).fetchall()

    res = {}
    for row in users:
        res[str(row[0])] = {
            'username': row[1],
            'clan_id': row[4],
            'avatar': row[5] or -1,
            'lat': row[6] or -1,
            'lon': row[7] or -1
        }
    return jsonify(res)

@bp.route('/create', methods=('GET', 'POST'))
@login_required
def create():
    """Create a new post for the current user."""
    if request.method == 'POST':
        name = request.form['name']
        color = request.form['color']
        avatar = request.form['avatar']
        error = None

        if not name:
            error = 'Name is required.'

        if error is not None:
            flash(error)
        else:
            db = get_db()
            db.execute(
                'INSERT INTO clans (name,color,avatar)'
                ' VALUES (?, ?, ?)',
                (name,color, avatar)
            )
            db.commit()
            return 'Add Clan' #redirect(url_for('blog.index'))

    return 'create clan form '#render_template('blog/create.html')

bp.route('/update/<int:id>', methods=('GET', 'POST'))
@login_required
def update(id):
    """Update a post if the current user is the author."""
    clan = get_clan(id)

    if request.method == 'POST':
        name = request.form['name']
        color = request.form['color']
        avatar = request.form['avatar']
        error = None

        if not name:
            error = 'Name is required.'

        if error is not None:
            flash(error)
        else:
            db = get_db()
            db.execute(
                'UPDATE clans SET name = ?, color = ?, avatar = ? WHERE id = ?',
                (name, color, avatar, id)
            )
            db.commit()
            return 'update clan'#redirect(url_for('blog.index'))

    return 'update clan form'#render_template('blog/update.html', clan = clan)

def get_clan(id):
    db = get_db()

    clan = db.execute(
        'SELECT * FROM clans WHERE id = ?', (id,)
    ).fetchone()

    return clan
