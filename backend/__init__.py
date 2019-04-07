import os

from flask import Flask
from flask_cors import CORS


def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    CORS(app)
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'backend.sqlite'),
        CORS_HEADERS='Content-Type',
    )

#    app.config['CORS_HEADERS'] = 'Content-Type'

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # a simple page that says hello
    @app.route('/')
    def hello():
        return 'Shoot it man!'

    from . import db
    db.init_app(app)


    from . import views_test
    from . import beacons
    from . import clans
    from . import users
    app.register_blueprint(views_test.bp)
    app.register_blueprint(beacons.bp)
    app.register_blueprint(clans.bp)
    app.register_blueprint(users.bp)

    return app

