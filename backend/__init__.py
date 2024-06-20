from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from backend.config import Config

"""
Initialize the SQLAlchemy ORM (Object-Relational Mapper) for database manipulation.
Initialize Flask for web application backend routing.
Enable CORS (Cross-Origin Resource Sharing) to allow the frontend to communicate with the backend on a different port.

NOTE: This is a small app, but if it were larger and more complex
we could utilize blueprints to group routes into their own sections.
"""

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app)
    db.init_app(app)

    with app.app_context():
        from backend import routes
        db.create_all()

    return app
